import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/**
 * Interactive viewer shared by the 3D explorers (the Jurien Bay home, the module and the build-up samples). Each
 * passes an ExplorerScene: how to build its model, how far each group moves when separated, any floor views, and
 * the size of its stage (shadow area, ground, pan limits). Renders on demand (nothing runs while idle).
 *
 * Two modes share one canvas:
 *   compact  in the page: horizontal drag turns the home at a fixed height; wheel and vertical swipes
 *            still scroll the page, and there is no zoom, pan or picking
 *   full     in the full-screen view: orbit, zoom, pan, picking and keyboard control
 */

export type ExplorerMode = "compact" | "full";

type Vec3 = readonly [x: number, y: number, z: number];

/** Stored on each mesh's userData by the scene's builder. */
export interface MeshTag {
  group: string | null;
  level: string;
  material: string;
}

export interface SceneModel {
  /** Added to the scene as is; builders centre the model on the origin in plan. */
  object: THREE.Group;
  groups: Map<string, THREE.Group>;
  meshes: THREE.Mesh[];
  materials: Record<string, THREE.Material>;
  dispose(): void;
}

export interface ExplorerScene {
  /** Accessible name for the canvas. */
  label: string;
  build(options: { anisotropy: number }): SceneModel;
  /** Offset of each group at full separation, in metres. */
  explode: Record<string, Vec3>;
  /** Visibility tiers: a view shows meshes whose level ranks at or below its maxRank. */
  views?: readonly { id: string; maxRank: number }[];
  levelRank?: Record<string, number>;
  stage: {
    /** Half-size of the sun's shadow camera, and its far plane. */
    shadowExtent: number;
    shadowFar: number;
    sun: Vec3;
    /** Soft pool of ground under the model: radius, stretch along z, height. */
    groundRadius: number;
    groundStretch: number;
    groundY: number;
    /** Orbit target used when nothing is visible. */
    target: Vec3;
    /** Panning keeps the orbit target inside this box. */
    panLimit: readonly [Vec3, Vec3];
  };
}

export interface ExplorerOptions {
  host: HTMLElement;
  scene: ExplorerScene;
  reducedMotion: boolean;
  onSelect(id: string | null): void;
  onExit(): void;
  onError(reason: string): void;
}

export interface Explorer {
  setMode(mode: ExplorerMode): void;
  setExplode(amount: number): void;
  setView(id: string): void;
  select(id: string | null): void;
  isGroupVisible(id: string): boolean;
  resetView(): void;
  rotate(dTheta: number, dPhi: number): void;
  zoom(factor: number): void;
  /** Rendering cost of the last frame, for diagnostics. */
  stats(): { meshes: number; drawCalls: number; triangles: number };
  dispose(): void;
}

const FRUSTUM = 14; // half-height of the orthographic view in metres at zoom 1
const DEFAULT_POLAR = THREE.MathUtils.degToRad(60); // elevated three-quarter, close to isometric
const DEFAULT_AZIMUTH = THREE.MathUtils.degToRad(145); // front (-z) leading, north side (+x) in view
const MIN_POLAR = 0.12;
const MAX_POLAR = THREE.MathUtils.degToRad(82); // never below the ground plane
/** Full view: the orbit and zoom centre sits this fraction of the half-height below the screen centre (7% of the
 *  view height), so the house stays a little low, clear of the hints and buttons along the top, at any angle and zoom. */
const FULL_VIEW_DROP = 0.14;
const CLICK_SLOP = 6; // px of pointer travel still treated as a click rather than a drag
const HIGHLIGHT = new THREE.Color("#c69a48");

export function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function createExplorer(options: ExplorerOptions): Explorer {
  const { host, reducedMotion, scene: definition } = options;
  const { stage } = definition;
  const defaultTarget = new THREE.Vector3(...stage.target);
  if (!webglAvailable()) throw new Error("webgl-unavailable");

  const small = () => host.clientWidth < 768;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small() ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const canvas = renderer.domElement;
  canvas.className = "block h-full w-full outline-none";
  canvas.tabIndex = -1;
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", definition.label);
  host.appendChild(canvas);

  // Scene, light and ground ------------------------------------------------------------------------
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = environment;
  scene.environmentIntensity = 0.35;

  scene.add(new THREE.HemisphereLight("#ffffff", "#e2ddd3", 0.6));
  const sun = new THREE.DirectionalLight("#fff4e6", 2.6);
  sun.position.set(...stage.sun);
  sun.castShadow = true;
  sun.shadow.mapSize.setScalar(small() ? 1024 : 2048);
  const extent = stage.shadowExtent;
  Object.assign(sun.shadow.camera, { left: -extent, right: extent, top: extent, bottom: -extent, near: 1, far: stage.shadowFar });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.03;
  sun.shadow.radius = 4;
  scene.add(sun, sun.target);

  const groundShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(stage.groundRadius * 5.4, stage.groundRadius * 5.4),
    new THREE.ShadowMaterial({ opacity: 0.16 }),
  );
  groundShadow.rotation.x = -Math.PI / 2;
  groundShadow.position.y = stage.groundY + 0.005;
  groundShadow.receiveShadow = true;
  scene.add(groundShadow);

  const discTexture = (() => {
    const size = 256;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(40,36,30,0.07)");
    gradient.addColorStop(0.6, "rgba(40,36,30,0.035)");
    gradient.addColorStop(1, "rgba(40,36,30,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  })();
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(stage.groundRadius, 64),
    new THREE.MeshBasicMaterial({ map: discTexture, transparent: true, depthWrite: false }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = stage.groundY;
  ground.scale.set(1, stage.groundStretch, 1); // stretch the pool of ground along a long model
  scene.add(ground);

  // Model ----------------------------------------------------------------------------------------
  const model = definition.build({ anisotropy: Math.min(8, renderer.capabilities.getMaxAnisotropy()) });
  scene.add(model.object);
  const pickable = model.meshes.filter((mesh) => (mesh.userData as MeshTag).group);

  // Camera and controls --------------------------------------------------------------------------
  const camera = new THREE.OrthographicCamera(-FRUSTUM, FRUSTUM, FRUSTUM, -FRUSTUM, -200, 400);
  const controls = new OrbitControls(camera, canvas);
  controls.enabled = false;
  controls.enableDamping = !reducedMotion;
  controls.dampingFactor = 0.09;
  controls.minPolarAngle = MIN_POLAR;
  controls.maxPolarAngle = MAX_POLAR;
  controls.screenSpacePanning = true;
  controls.zoomToCursor = false;
  controls.rotateSpeed = 0.8;

  let mode: ExplorerMode = "compact";
  let fittedZoom = 1;
  let cameraTouched = false; // stop auto-framing once the visitor moves the camera themselves

  const visibleBounds = () => {
    const bounds = new THREE.Box3();
    const meshBox = new THREE.Box3();
    model.object.updateMatrixWorld(true);
    for (const mesh of model.meshes) {
      if (!mesh.visible || !mesh.parent?.visible || !mesh.geometry.boundingBox) continue;
      bounds.union(meshBox.copy(mesh.geometry.boundingBox).applyMatrix4(mesh.matrixWorld));
    }
    return bounds;
  };

  const updateFrustum = () => {
    const aspect = host.clientWidth / Math.max(1, host.clientHeight);
    camera.left = -FRUSTUM * aspect;
    camera.right = FRUSTUM * aspect;
    camera.top = FRUSTUM;
    camera.bottom = -FRUSTUM;
    // Full view: shift the picture down by a fixed number of pixels. A view offset is applied after zoom (an
    // asymmetric frustum would scale with zoom and drift back to centre), so the house stays low at any zoom.
    const width = host.clientWidth;
    const height = Math.max(1, host.clientHeight);
    if (mode === "full") camera.setViewOffset(width, height, 0, (-height * FULL_VIEW_DROP) / 2, width, height);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  };

  /** Projected extents of the visible model, in view space, for the camera's current orientation. */
  const projectedExtents = () => {
    camera.updateMatrixWorld(true);
    const toView = new THREE.Matrix4();
    const point = new THREE.Vector3();
    const min = { x: Infinity, y: Infinity };
    const max = { x: -Infinity, y: -Infinity };
    for (const mesh of model.meshes) {
      if (!mesh.visible || !mesh.parent?.visible) continue;
      toView.multiplyMatrices(camera.matrixWorldInverse, mesh.matrixWorld);
      const position = mesh.geometry.getAttribute("position");
      for (let i = 0; i < position.count; i += 3) {
        point.fromBufferAttribute(position, i).applyMatrix4(toView);
        min.x = Math.min(min.x, point.x);
        min.y = Math.min(min.y, point.y);
        max.x = Math.max(max.x, point.x);
        max.y = Math.max(max.y, point.y);
      }
    }
    if (!Number.isFinite(min.x)) Object.assign(min, { x: -10, y: -10 }), Object.assign(max, { x: 10, y: 10 });
    return { min, max };
  };

  const aimAt = (target: THREE.Vector3, azimuth: number) => {
    controls.target.copy(target);
    camera.position.copy(target).add(new THREE.Vector3().setFromSphericalCoords(80, DEFAULT_POLAR, azimuth));
    camera.lookAt(target);
  };

  /**
   * Place the camera at the default angle and zoom so the visible model fits with comfortable margins.
   * Full view fits the default angle tightly. Compact view can only turn, so it fits the home at every
   * angle around it: turning never crops it and the zoom never has to change.
   */
  const frame = (bounds = visibleBounds()) => {
    const centre = bounds.isEmpty() ? defaultTarget.clone() : bounds.getCenter(new THREE.Vector3());
    const aspect = host.clientWidth / Math.max(1, host.clientHeight);

    if (mode === "compact") {
      let zoom = Infinity;
      for (let step = 0; step < 16; step++) {
        aimAt(centre, (step / 16) * Math.PI * 2);
        const { min, max } = projectedExtents();
        const halfWidth = Math.max(-min.x, max.x);
        const halfHeight = Math.max(-min.y, max.y);
        zoom = Math.min(zoom, (FRUSTUM * aspect) / halfWidth, FRUSTUM / halfHeight);
      }
      aimAt(centre, DEFAULT_AZIMUTH);
      fittedZoom = zoom * (small() ? 0.94 : 0.9);
    } else {
      // Orbit around a point in the house itself (centred in plan, a little below mid-height), so rotating never
      // swings the house off-centre. That point sits FULL_VIEW_DROP below the screen centre (view offset), so fit
      // the house's projected extents around it: less room below than above.
      const size = bounds.isEmpty() ? new THREE.Vector3(10, 8, 10) : bounds.getSize(new THREE.Vector3());
      const pivot = centre.clone().setY((bounds.isEmpty() ? 0 : bounds.min.y) + size.y * 0.42);
      aimAt(pivot, DEFAULT_AZIMUTH);
      const { min, max } = projectedExtents();
      const halfWidth = Math.max(-min.x, max.x);
      fittedZoom =
        Math.min(
          (FRUSTUM * aspect) / halfWidth,
          (FRUSTUM * (1 + FULL_VIEW_DROP)) / Math.max(1e-3, max.y),
          (FRUSTUM * (1 - FULL_VIEW_DROP)) / Math.max(1e-3, -min.y),
        ) * (small() ? 0.94 : 0.92);
    }
    camera.zoom = fittedZoom;
    camera.updateProjectionMatrix();
    controls.minZoom = fittedZoom * 0.6;
    controls.maxZoom = fittedZoom * 5;
    controls.update();
  };

  // Keep panning near the model
  const panLimit = new THREE.Box3(new THREE.Vector3(...stage.panLimit[0]), new THREE.Vector3(...stage.panLimit[1]));
  const clampTarget = () => {
    const clamped = controls.target.clone().clamp(panLimit.min, panLimit.max);
    if (clamped.equals(controls.target)) return;
    const delta = clamped.sub(controls.target);
    controls.target.add(delta);
    camera.position.add(delta);
  };

  // Rendering on demand ----------------------------------------------------------------------------
  let frameRequest = 0;
  let disposed = false;
  const render = () => {
    frameRequest = 0;
    if (disposed) return;
    controls.update(); // advances damping; emits "change", which requests the next frame while moving
    renderer.render(scene, camera);
  };
  const requestRender = () => {
    if (!frameRequest && !disposed) frameRequest = requestAnimationFrame(render);
  };
  controls.addEventListener("change", () => {
    clampTarget();
    requestRender();
  });
  controls.addEventListener("start", () => (cameraTouched = true));

  const resize = () => {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small() ? 1.5 : 2));
    renderer.setSize(host.clientWidth, host.clientHeight, false);
    updateFrustum();
    if (!cameraTouched) frame();
    requestRender();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);

  // Highlighting: swap to tinted clones so shared materials stay untouched ---------------------------
  const tinted = new Map<string, THREE.Material>();
  const tint = (base: THREE.Material, strength: number) => {
    const key = `${base.uuid}:${strength}`;
    let material = tinted.get(key);
    if (!material) {
      material = base.clone();
      if ("emissive" in material) {
        (material as THREE.MeshStandardMaterial).emissive = HIGHLIGHT.clone();
        (material as THREE.MeshStandardMaterial).emissiveIntensity = strength;
      }
      tinted.set(key, material);
    }
    return material;
  };

  let hovered: string | null = null;
  let selected: string | null = null;
  const paint = () => {
    for (const mesh of model.meshes) {
      const tag = mesh.userData as MeshTag;
      const base = model.materials[tag.material];
      const strength = tag.group && tag.group === selected ? 0.32 : tag.group && tag.group === hovered ? 0.16 : 0;
      mesh.material = strength ? tint(base, strength) : base;
    }
    requestRender();
  };

  // Picking ------------------------------------------------------------------------------------------
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const pick = (clientX: number, clientY: number): string | null => {
    const rect = canvas.getBoundingClientRect();
    pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const candidates = pickable.filter((mesh) => mesh.visible && mesh.parent?.visible);
    const hit = raycaster.intersectObjects(candidates, false)[0];
    return hit ? ((hit.object.userData as MeshTag).group ?? null) : null;
  };

  let down: { x: number; y: number; time: number } | null = null;
  let hoverQueued: PointerEvent | null = null;
  const onPointerDown = (event: PointerEvent) => {
    down = { x: event.clientX, y: event.clientY, time: performance.now() };
  };
  const onPointerUp = (event: PointerEvent) => {
    if (!down || mode !== "full") return;
    const travel = Math.hypot(event.clientX - down.x, event.clientY - down.y);
    const quick = performance.now() - down.time < 600;
    down = null;
    if (travel > CLICK_SLOP || !quick || event.button !== 0) return;
    const id = pick(event.clientX, event.clientY);
    api.select(id === selected ? null : id);
    options.onSelect(selected);
  };
  const onPointerMove = (event: PointerEvent) => {
    if (mode !== "full" || event.pointerType !== "mouse" || event.buttons) return;
    if (!hoverQueued) {
      requestAnimationFrame(() => {
        const queued = hoverQueued;
        hoverQueued = null;
        if (!queued || disposed) return;
        const id = pick(queued.clientX, queued.clientY);
        canvas.style.cursor = id ? "pointer" : "grab";
        if (id !== hovered) {
          hovered = id;
          paint();
        }
      });
    }
    hoverQueued = event;
  };
  const onPointerLeave = () => {
    if (hovered) {
      hovered = null;
      paint();
    }
  };
  const onKeyDown = (event: KeyboardEvent) => {
    const step = THREE.MathUtils.degToRad(event.shiftKey ? 3 : 10);
    switch (event.key) {
      case "ArrowLeft": api.rotate(-step, 0); break;
      case "ArrowRight": api.rotate(step, 0); break;
      case "ArrowUp": api.rotate(0, -step / 2); break;
      case "ArrowDown": api.rotate(0, step / 2); break;
      case "+": case "=": api.zoom(1.2); break;
      case "-": case "_": api.zoom(1 / 1.2); break;
      case "0": case "Home": api.resetView(); break;
      case "Escape": options.onExit(); break;
      default: return;
    }
    event.preventDefault();
  };
  const onContextLost = (event: Event) => {
    event.preventDefault();
    options.onError("context-lost");
  };

  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerleave", onPointerLeave);
  canvas.addEventListener("keydown", onKeyDown);
  canvas.addEventListener("webglcontextlost", onContextLost);

  // Public API -------------------------------------------------------------------------------------
  let explodeAmount = 0;
  const groupVisible = (id: string) => {
    const group = model.groups.get(id);
    return !!group && group.children.some((child) => child.visible);
  };

  const api: Explorer = {
    setMode(next) {
      mode = next;
      const full = mode === "full";
      controls.enabled = true;
      controls.enableZoom = full; // off: the wheel scrolls the page
      controls.enablePan = full;
      controls.minPolarAngle = full ? MIN_POLAR : DEFAULT_POLAR; // compact turns at a fixed height
      controls.maxPolarAngle = full ? MAX_POLAR : DEFAULT_POLAR;
      canvas.tabIndex = full ? 0 : -1;
      canvas.style.cursor = "grab";
      // Touch: compact leaves vertical swipes to the page, so only sideways drags turn the home
      canvas.style.touchAction = full ? "none" : "pan-y";
      if (!full && hovered) hovered = null;
      cameraTouched = false;
      updateFrustum();
      frame();
      paint();
      if (full) canvas.focus({ preventScroll: true });
    },
    setExplode(amount) {
      explodeAmount = THREE.MathUtils.clamp(amount, 0, 1);
      for (const [id, group] of model.groups) {
        const [x, y, z] = definition.explode[id] ?? [0, 0, 0];
        // Exactly the authored position at 0: no accumulated offsets
        group.position.set(x * explodeAmount, y * explodeAmount, z * explodeAmount);
      }
      if (!cameraTouched) frame();
      requestRender();
    },
    setView(id) {
      const maxRank = definition.views?.find((view) => view.id === id)?.maxRank ?? Infinity;
      for (const mesh of model.meshes) mesh.visible = (definition.levelRank?.[(mesh.userData as MeshTag).level] ?? 0) <= maxRank;
      if (selected && !groupVisible(selected)) {
        api.select(null);
        options.onSelect(null);
      }
      if (hovered && !groupVisible(hovered)) hovered = null;
      paint();
    },
    select(id) {
      selected = id && groupVisible(id) ? id : null;
      paint();
    },
    isGroupVisible: groupVisible,
    resetView() {
      cameraTouched = false;
      frame();
      requestRender();
    },
    rotate(dTheta, dPhi) {
      cameraTouched = true;
      const offset = camera.position.clone().sub(controls.target);
      const spherical = new THREE.Spherical().setFromVector3(offset);
      spherical.theta += dTheta;
      spherical.phi = THREE.MathUtils.clamp(spherical.phi + dPhi, MIN_POLAR, MAX_POLAR);
      camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));
      camera.lookAt(controls.target);
      controls.update();
      requestRender();
    },
    zoom(factor) {
      cameraTouched = true;
      camera.zoom = THREE.MathUtils.clamp(camera.zoom * factor, controls.minZoom, controls.maxZoom);
      camera.updateProjectionMatrix();
      requestRender();
    },
    stats() {
      const { calls, triangles } = renderer.info.render;
      return { meshes: model.meshes.length, drawCalls: calls, triangles };
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frameRequest);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("keydown", onKeyDown);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      controls.dispose();
      model.dispose();
      tinted.forEach((material) => material.dispose());
      groundShadow.geometry.dispose();
      (groundShadow.material as THREE.Material).dispose();
      ground.geometry.dispose();
      (ground.material as THREE.Material).dispose();
      discTexture.dispose();
      environment.dispose();
      pmrem.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };

  renderer.setSize(host.clientWidth, host.clientHeight, false);
  updateFrustum();
  api.setMode("compact");
  requestRender();
  return api;
}
