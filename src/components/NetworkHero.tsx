import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface RegionNode {
  id: string;
  name: string;
  sub: string;
  desc: string;
  lat: number;
  lon: number;
  color: string;
  dotType: string;
  offset: [number, number];
}

export default function NetworkHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const regionsData: RegionNode[] = [
    { id: 'na',        name: 'North America', sub: 'Incorporation',      desc: 'USA LLC • 7 Days',  lat: 38.0,  lon: -98.0,  color: '#00d4ff', dotType: 'cyan', offset: [-160, -45] },
    { id: 'europe',    name: 'Europe',         sub: 'Business Expansion', desc: 'Seamless Growth',   lat: 50.0,  lon: 15.0,   color: '#fbbf24', dotType: 'gold', offset: [45,  -95] },
    { id: 'me',        name: 'Middle East',    sub: 'Banking',            desc: 'UAE Free Zone',     lat: 25.0,  lon: 45.0,   color: '#00c9a7', dotType: 'teal', offset: [-155, 45] },
    { id: 'africa',    name: 'Africa',         sub: 'Market Entry',       desc: '50+ Countries',     lat: -2.0,  lon: 22.0,   color: '#fbbf24', dotType: 'gold', offset: [-45,  95] },
    { id: 'asia',      name: 'Asia',           sub: 'Compliance',         desc: 'Singapore Pte',     lat: 18.0,  lon: 100.0,  color: '#10b981', dotType: 'emerald', offset: [135, -25] },
    { id: 'australia', name: 'Australia',      sub: 'Expansion',          desc: 'UK Ltd Ready',      lat: -24.0, lon: 134.0,  color: '#0070f3', dotType: 'blue', offset: [65,   55] }
  ];

  const earthRadius = 3.9;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 450;

    // Convert (Lat, Lon) to 3D Cartesian coordinates on sphere
    function getSphereCoords(lat: number, lon: number, r: number): THREE.Vector3 {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(r * Math.sin(phi) * Math.cos(theta)),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.2);

    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight('#04081c', 2.5);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight('#e0f2fe', 3.8);
    sunLight.position.set(8, 6, 8);
    scene.add(sunLight);
    const goldenLight = new THREE.DirectionalLight('#fbbf24', 2.3);
    goldenLight.position.set(-8, -4, 4);
    scene.add(goldenLight);

    const globeGroup = new THREE.Group();
    globeGroup.rotation.y = 2.5;
    globeGroup.rotation.x = 0.45;
    scene.add(globeGroup);

    /* ── Procedural Night City Lights Map ── */
    function createNightCityMap(): HTMLCanvasElement {
      const mapCanvas = document.createElement('canvas');
      mapCanvas.width = 2048; mapCanvas.height = 1024;
      const ctx = mapCanvas.getContext('2d');
      if (!ctx) return mapCanvas;

      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);
      ctx.strokeStyle = '#00c9a706'; ctx.lineWidth = 1;
      for (let x = 0; x < mapCanvas.width; x += 48) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,mapCanvas.height); ctx.stroke(); }
      for (let y = 0; y < mapCanvas.height; y += 48) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(mapCanvas.width,y); ctx.stroke(); }

      function renderContinent(points: [number, number][], borderGrad: string, fillStyle: string) {
        if (!ctx) return;
        ctx.save(); ctx.beginPath();
        points.forEach((p,i)=>{
          const lx=((p[1]+180)/360)*mapCanvas.width;
          const ly=((90-p[0])/180)*mapCanvas.height;
          if(i===0) ctx.moveTo(lx,ly); else ctx.lineTo(lx,ly);
        });
        ctx.closePath(); ctx.fillStyle=fillStyle; ctx.fill();
        ctx.strokeStyle=borderGrad; ctx.lineWidth=4.5;
        ctx.shadowColor=borderGrad; ctx.shadowBlur=10; ctx.stroke(); ctx.restore();
      }

      renderContinent([[70,-160],[72,-100],[60,-60],[50,-50],[25,-80],[15,-90],[15,-100],[25,-110],[35,-120],[60,-145]],'rgba(0,212,255,0.35)','#060a17');
      renderContinent([[12,-75],[5,-45],[-10,-35],[-35,-60],[-55,-70],[-40,-75],[-10,-80]],'rgba(0,112,243,0.3)','#060a17');
      renderContinent([[35,-10],[30,30],[15,40],[5,45],[-15,38],[-34,20],[-30,10],[5,10],[5,-10]],'rgba(251,191,36,0.35)','#060a17');
      renderContinent([[70,-10],[75,40],[70,80],[70,140],[55,160],[35,140],[10,105],[10,80],[15,40],[30,35],[40,0]],'rgba(251,191,36,0.45)','#060a17');
      renderContinent([[-11,113],[-15,150],[-35,150],[-38,140],[-35,115]],'rgba(251,191,36,0.35)','#060a17');
      renderContinent([[80,-70],[80,-30],[65,-40],[60,-60]],'rgba(251,191,36,0.25)','#060a17');

      function populateCityLights(minLat: number, maxLat: number, minLon: number, maxLon: number, count: number, hexColor: string){
        if (!ctx) return;
        ctx.fillStyle=hexColor;
        for(let i=0;i<count;i++){
          const lat=minLat+Math.random()*(maxLat-minLat);
          const lon=minLon+Math.random()*(maxLon-minLon);
          const cx=((lon+180)/360)*mapCanvas.width;
          const cy=((90-lat)/180)*mapCanvas.height;
          ctx.beginPath(); ctx.arc(cx,cy,0.7+Math.random()*1.6,0,Math.PI*2); ctx.fill();
        }
      }

      populateCityLights(28,48,-120,-75,200,'#00d4ff');
      populateCityLights(30,45,-115,-80,80,'#ffea9f');
      populateCityLights(40,60,-8,30,280,'#ffea9f');
      populateCityLights(45,58,2,25,110,'#ffffff');
      populateCityLights(8,28,70,95,270,'#00c9a7');
      populateCityLights(10,26,72,88,120,'#ffea9f');
      populateCityLights(1,15,98,116,160,'#10b981');
      populateCityLights(18,30,38,58,120,'#fbbf24');
      populateCityLights(22,28,42,55,60,'#00c9a7');
      populateCityLights(-38,-15,140,151,90,'#0070f3');
      return mapCanvas;
    }

    const worldTexture = new THREE.CanvasTexture(createNightCityMap());
    const earthMesh = new THREE.Mesh(
      new THREE.SphereGeometry(earthRadius, 64, 64),
      new THREE.MeshPhongMaterial({ map: worldTexture, bumpScale: 0.05, specular: new THREE.Color('#00c9a7'), shininess: 64, transparent: true, opacity: 0.98 })
    );
    globeGroup.add(earthMesh);

    const atmosphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(earthRadius * 1.018, 64, 64),
      new THREE.MeshBasicMaterial({ color: new THREE.Color('#00d4ff'), transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, side: THREE.BackSide })
    );
    globeGroup.add(atmosphereMesh);

    /* ── Procedural Clouds ── */
    function createCloudCanvas(): HTMLCanvasElement {
      const cloudCanvas = document.createElement('canvas');
      cloudCanvas.width = 1024; cloudCanvas.height = 512;
      const ctx = cloudCanvas.getContext('2d');
      if (!ctx) return cloudCanvas;

      ctx.clearRect(0, 0, cloudCanvas.width, cloudCanvas.height);
      for (let i = 0; i < 45; i++) {
        const x=Math.random()*cloudCanvas.width, y=Math.random()*cloudCanvas.height;
        const rx=80+Math.random()*160, ry=25+Math.random()*70;
        const grad=ctx.createRadialGradient(x,y,0,x,y,rx);
        grad.addColorStop(0,'rgba(255,255,255,0.12)');
        grad.addColorStop(0.5,'rgba(251,191,36,0.04)');
        grad.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=grad;
        ctx.beginPath(); ctx.ellipse(x,y,rx,ry,Math.random()*Math.PI,0,Math.PI*2); ctx.fill();
      }
      return cloudCanvas;
    }

    const cloudsTexture = new THREE.CanvasTexture(createCloudCanvas());
    const cloudsMesh = new THREE.Mesh(
      new THREE.SphereGeometry(earthRadius * 1.025, 64, 64),
      new THREE.MeshBasicMaterial({ map: cloudsTexture, transparent: true, opacity: 0.48, blending: THREE.AdditiveBlending })
    );
    globeGroup.add(cloudsMesh);

    /* ── Data Routes & Particle Flow ── */
    const nodeOuterAnchors: { [key: string]: THREE.Object3D } = {};
    interface FlowParticle {
      curve: THREE.CatmullRomCurve3;
      mesh: THREE.Mesh;
      progress: number;
      speed: number;
    }
    const flowParticles: FlowParticle[] = [];
    const centralHubPos = getSphereCoords(20.5937, 78.9629, earthRadius);

    regionsData.forEach(node => {
      const nodePos = getSphereCoords(node.lat, node.lon, earthRadius);
      const anchorPos = getSphereCoords(node.lat, node.lon, earthRadius * 1.34);
      const anchorObj = new THREE.Object3D();
      anchorObj.position.copy(anchorPos);
      globeGroup.add(anchorObj);
      nodeOuterAnchors[node.id] = anchorObj;

      const pointerLineGeom = new THREE.BufferGeometry().setFromPoints([nodePos, anchorPos]);
      const pointerLine = new THREE.Line(pointerLineGeom, new THREE.LineBasicMaterial({ color: new THREE.Color(node.color), transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending }));
      globeGroup.add(pointerLine);

      const midDir = new THREE.Vector3().addVectors(centralHubPos, nodePos).normalize();
      const midPoint = midDir.multiplyScalar(earthRadius + (centralHubPos.distanceTo(nodePos) * 0.28));
      const curve = new THREE.CatmullRomCurve3([centralHubPos, midPoint, nodePos]);
      const routeLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(60)), new THREE.LineBasicMaterial({ color: new THREE.Color(node.color), transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending }));
      globeGroup.add(routeLine);

      const particleGeometry = new THREE.SphereGeometry(0.016, 8, 8);
      const particleMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(node.color), transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending });
      for (let i = 0; i < 2; i++) {
        const pMesh = new THREE.Mesh(particleGeometry, particleMaterial);
        pMesh.position.copy(centralHubPos);
        globeGroup.add(pMesh);
        flowParticles.push({ curve, mesh: pMesh, progress: i * 0.5, speed: 0.0035 + Math.random() * 0.002 });
      }
    });

    /* ── Concentric Orbit Belts ── */
    const orbitsGroup = new THREE.Group();
    orbitsGroup.rotation.x = 0.35;
    orbitsGroup.rotation.z = 0.15;
    scene.add(orbitsGroup);

    interface RingBelt {
      mesh: THREE.Line;
      radius: number;
      speed: number;
      floaters: THREE.Mesh[];
    }
    const premiumRings: RingBelt[] = [];

    function buildOrbitBelt(radius: number, tiltY: number, speed: number, colorHex: string) {
      const points = [];
      for (let i = 0; i <= 200; i++) {
        const th = (i / 200) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(th) * radius, 0, Math.sin(th) * radius));
      }
      const ringLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: new THREE.Color(colorHex), transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending }));
      ringLine.rotation.y = tiltY;
      orbitsGroup.add(ringLine);
      const satelliteMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(colorHex), transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending });
      const floatersList: THREE.Mesh[] = [];
      for (let j = 0; j < 3; j++) {
        const satelliteMesh = new THREE.Mesh(new THREE.SphereGeometry(0.024, 12, 12), satelliteMat);
        orbitsGroup.add(satelliteMesh);
        floatersList.push(satelliteMesh);
      }
      premiumRings.push({ mesh: ringLine, radius, speed, floaters: floatersList });
    }

    buildOrbitBelt(earthRadius * 1.05,  0.45,  0.14, '#00c9a7');
    buildOrbitBelt(earthRadius * 1.13, -0.65, -0.09, '#fbbf24');
    buildOrbitBelt(earthRadius * 1.22,  0.9,   0.11, '#0070f3');

    /* ── Drag Interaction ── */
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let dragSpeedX = 0, dragSpeedY = 0;
    const mouseFactor = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseDown = (e: MouseEvent) => { isDragging = true; prevMousePos = { x: e.clientX, y: e.clientY }; };
    const handleMouseUp = () => { isDragging = false; };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseFactor.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.7;
      mouseFactor.targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.7;
      if (isDragging) {
        const dx = e.clientX - prevMousePos.x;
        const dy = e.clientY - prevMousePos.y;
        dragSpeedX = dx * 0.0055; dragSpeedY = dy * 0.0055;
        globeGroup.rotation.y += dragSpeedX;
        globeGroup.rotation.x += dragSpeedY;
        globeGroup.rotation.x = Math.max(-1.1, Math.min(1.1, globeGroup.rotation.x));
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) { isDragging = true; prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        const dx = e.touches[0].clientX - prevMousePos.x;
        const dy = e.touches[0].clientY - prevMousePos.y;
        dragSpeedX = dx * 0.0055; dragSpeedY = dy * 0.0055;
        globeGroup.rotation.y += dragSpeedX;
        globeGroup.rotation.x += dragSpeedY;
        globeGroup.rotation.x = Math.max(-1.1, Math.min(1.1, globeGroup.rotation.x));
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp);

    const tempV = new THREE.Vector3();
    const cameraPos = new THREE.Vector3();
    const clock = new THREE.Clock();
    let animRequestID: number;

    function animate() {
      animRequestID = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      mouseFactor.x += (mouseFactor.targetX - mouseFactor.x) * 2.0 * delta;
      mouseFactor.y += (mouseFactor.targetY - mouseFactor.y) * 2.0 * delta;
      camera.position.x = mouseFactor.x;
      camera.position.y = -mouseFactor.y;
      camera.lookAt(0, 0, 0);

      if (!isDragging) {
        dragSpeedX *= 0.95; dragSpeedY *= 0.95;
        globeGroup.rotation.y += dragSpeedX + 0.035 * delta;
        globeGroup.rotation.x += dragSpeedY;
      }

      cloudsMesh.rotation.y = time * 0.008;
      orbitsGroup.rotation.y = time * 0.024;

      flowParticles.forEach(p => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        p.mesh.position.copy(p.curve.getPointAt(p.progress));
      });

      premiumRings.forEach(rg => {
        rg.floaters.forEach((fl, idx) => {
          const angle = (time * rg.speed) + (idx * ((Math.PI * 2) / rg.floaters.length));
          const localVec = new THREE.Vector3(Math.cos(angle) * rg.radius, 0, Math.sin(angle) * rg.radius);
          localVec.applyEuler(rg.mesh.rotation);
          fl.position.copy(localVec);
        });
      });

      // Project 3D card anchors → 2D screen positions
      regionsData.forEach(node => {
        const anchorObj = nodeOuterAnchors[node.id];
        const cardElement = document.getElementById(`globe-card-node-${node.id}`);
        if (anchorObj && cardElement) {
          anchorObj.getWorldPosition(tempV);
          cameraPos.setFromMatrixPosition(camera.matrixWorld);
          const anchorDirection = anchorObj.position.clone().applyMatrix4(globeGroup.matrixWorld).normalize();
          const visibility = cameraPos.normalize().dot(anchorDirection);
          if (visibility > -0.05) {
            tempV.project(camera);
            const px = (tempV.x * 0.5 + 0.5) * width;
            const py = (tempV.y * -0.5 + 0.5) * height;
            const scaleAmt = Math.min(width / 520, height / 560);
            const driftX = node.offset[0] * scaleAmt;
            const driftY = node.offset[1] * scaleAmt;

            const CARD_HALF_W = 80;
            const CARD_HALF_H = 38;
            const CLAMP_MARGIN = 8;

            let finalX = px + driftX;
            let finalY = py + driftY;

            const minX = CARD_HALF_W + CLAMP_MARGIN;
            const maxX = width - CARD_HALF_W - CLAMP_MARGIN;
            const minY = CARD_HALF_H + CLAMP_MARGIN;
            const maxY = height - CARD_HALF_H - CLAMP_MARGIN;

            if (maxX > minX) finalX = Math.max(minX, Math.min(maxX, finalX));
            if (maxY > minY) finalY = Math.max(minY, Math.min(maxY, finalY));

            cardElement.style.transform = `translate(-50%,-50%) translate(${finalX}px,${finalY}px)`;
            cardElement.style.opacity = '1';
            cardElement.style.pointerEvents = 'auto';
          } else {
            cardElement.style.opacity = '0';
            cardElement.style.pointerEvents = 'none';
          }
        }
      });

      renderer.render(scene, camera);
    }

    function handleResize() {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth;
      height = container.clientHeight;
      const aspect = width / height;
      camera.aspect = aspect;
      const maxSystemRadius = earthRadius * 1.32;
      const fovRad = (camera.fov * Math.PI) / 180;
      const halfFovY = fovRad / 2;
      const halfFovX = Math.atan(Math.tan(halfFovY) * aspect);
      const zNeededForY = maxSystemRadius / Math.sin(halfFovY);
      const zNeededForX = maxSystemRadius / Math.sin(halfFovX);
      const requiredZ = Math.max(zNeededForY, zNeededForX) * 1.15;
      if (aspect < 1) {
        globeGroup.position.y = -0.38;
        orbitsGroup.position.y = -0.38;
      } else {
        globeGroup.position.y = 0;
        orbitsGroup.position.y = 0;
      }
      camera.position.z = Math.max(requiredZ, 5.4);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    setTimeout(() => handleResize(), 50);
    animate();

    return () => {
      cancelAnimationFrame(animRequestID);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full select-none overflow-visible bg-transparent transition-all duration-700"
      style={{ minHeight: '360px' }}
    >
      {/* Glow spotlights behind canvas */}
      <div className="globe-spotlight gs1"></div>
      <div className="globe-spotlight gs2"></div>

      {/* Interactive 3D Earth WebGL Canvas */}
      <canvas ref={canvasRef} id="globe-canvas" className="absolute inset-0 w-full h-full border-[20px] border-transparent block" style={{ borderRadius: '20px' }}></canvas>

      {/* Floating projection placards on 3D coordinates */}
      <div className="globe-cards-layer">
        {regionsData.map(node => (
          <div 
            key={node.id} 
            id={`globe-card-node-${node.id}`} 
            className={`globe-card ${hoveredNode === node.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className="gc-inner">
              <div className="gc-header">
                <span className={`gc-dot dot-${node.dotType}`}></span>
                <span className={`gc-title text-${node.dotType}`}>{node.name}</span>
              </div>
              <span className="gc-subtitle">{node.sub}</span>
              <span className="gc-desc">{node.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
