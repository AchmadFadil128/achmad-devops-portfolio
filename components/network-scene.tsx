'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function NetworkScene() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = mount.current;
    if (!element) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 8.0;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setClearColor(0x000000, 0);
    element.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.IcosahedronGeometry(2.08, 2);
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry),
      new THREE.LineBasicMaterial({ color: 0x9cffc8, transparent: true, opacity: 0.28 }),
    );
    group.add(wire);

    const points = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({ color: 0xf3ff6f, size: 0.038, transparent: true, opacity: 0.95 }),
    );
    group.add(points);

    const ringGeometry = new THREE.TorusGeometry(2.72, 0.008, 8, 180);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x83cfff, transparent: true, opacity: 0.35 });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.set(1.12, 0.25, 0.35);
    group.add(ring);

    const satelliteGeometry = new THREE.SphereGeometry(0.055, 12, 12);
    const satelliteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const satellites = Array.from({ length: 7 }, (_, index) => {
      const mesh = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
      const angle = (index / 7) * Math.PI * 2;
      mesh.position.set(Math.cos(angle) * 2.7, Math.sin(angle * 1.4) * 1.2, Math.sin(angle) * 2.0);
      group.add(mesh);
      return mesh;
    });

    let pointerX = 0;
    let pointerY = 0;
    const onPointer = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.45;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.35;
    };
    element.addEventListener('pointermove', onPointer, { passive: true });

    const resize = () => {
      const width = element.clientWidth;
      const height = element.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);

    let frame = 0;
    const clock = new THREE.Clock();
    const render = () => {
      const elapsed = clock.getElapsedTime();
      if (!reducedMotion) {
        group.rotation.y += 0.0018;
        group.rotation.x += (pointerY - group.rotation.x) * 0.025;
        group.rotation.z += (pointerX - group.rotation.z) * 0.02;
        ring.rotation.z = elapsed * 0.08;
        satellites.forEach((satellite, index) => {
          satellite.scale.setScalar(0.75 + Math.sin(elapsed * 2 + index) * 0.22);
        });
      }
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      element.removeEventListener('pointermove', onPointer);
      geometry.dispose();
      ringGeometry.dispose();
      satelliteGeometry.dispose();
      (wire.material as THREE.Material).dispose();
      (points.material as THREE.Material).dispose();
      ringMaterial.dispose();
      satelliteMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="network-scene" ref={mount} aria-hidden="true" />;
}
