import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import AboutDisplay from './AboutDisplay';

const LaptopScene = () => {
  const [zoomState, setZoomState] = useState('idle'); // 'idle' | 'zooming' | 'zoomed'
  const [showAboutContent, setShowAboutContent] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const laptopGroupRef = useRef(null);
  const animationFrameRef = useRef(null);
  const raycasterRef = useRef(null);
  const mouseRef = useRef(new THREE.Vector2());

  // Check WebGL support
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebglSupported(false);
    }
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!webglSupported || !containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Raycaster for click detection
    raycasterRef.current = new THREE.Raycaster();

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(5, 5, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x007AFF, 0.3);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x5AC8FA, 0.5);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // Create Laptop
    const laptopGroup = new THREE.Group();
    laptopGroupRef.current = laptopGroup;

    // Laptop base (keyboard section)
    const baseGeometry = new THREE.BoxGeometry(4, 0.2, 3);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x2c2c2c,
      metalness: 0.8,
      roughness: 0.2
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0;
    base.castShadow = true;
    base.receiveShadow = true;
    laptopGroup.add(base);

    // Laptop screen back
    const screenGeometry = new THREE.BoxGeometry(4, 2.5, 0.1);
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.8,
      roughness: 0.2
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 1.5, -1.4);
    screen.rotation.x = Math.PI * 0.1;
    screen.castShadow = true;
    screen.receiveShadow = true;
    laptopGroup.add(screen);

    // Loading manager
    const loadingManager = new THREE.LoadingManager(
      () => {
        setAssetsLoaded(true);
        setLoadingProgress(100);
      },
      (url, itemsLoaded, itemsTotal) => {
        const progress = (itemsLoaded / itemsTotal) * 100;
        setLoadingProgress(progress);
      },
      (url) => {
        console.warn('Error loading:', url);
        // Even if texture fails, continue with default
        setAssetsLoaded(true);
      }
    );

    // Screen display area with texture
    const textureLoader = new THREE.TextureLoader(loadingManager);

    // Try to load the laptop image, fallback to gradient if not available
    const displayGeometry = new THREE.PlaneGeometry(3.8, 2.3);

    // Create a canvas texture as fallback
    const createFallbackTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(0.5, '#2d1b69');
      gradient.addColorStop(1, '#8b2e16');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      return new THREE.CanvasTexture(canvas);
    };

    const fallbackTexture = createFallbackTexture();

    const displayMaterial = new THREE.MeshBasicMaterial({
      map: fallbackTexture,
      emissive: 0x4466ff,
      emissiveIntensity: 0.2
    });

    // Try to load actual laptop image
    textureLoader.load(
      '/assets/images/laptop-reference.png',
      (texture) => {
        displayMaterial.map = texture;
        displayMaterial.needsUpdate = true;
      },
      undefined,
      (error) => {
        console.log('Using fallback texture');
        // Fallback is already set
      }
    );

    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.set(0, 1.5, -1.35);
    display.rotation.x = Math.PI * 0.1;
    laptopGroup.add(display);

    // Add laptop to scene
    laptopGroup.position.y = -0.5;
    scene.add(laptopGroup);

    // Mark as loaded even if texture loading is in progress
    setTimeout(() => {
      if (!assetsLoaded) {
        setAssetsLoaded(true);
      }
    }, 1000);

    // Animation loop
    const animate = () => {
      if (zoomState === 'idle' && laptopGroupRef.current) {
        // Gentle rotation animation
        laptopGroupRef.current.rotation.y += 0.003;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      if (zoomState !== 'zoomed') {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (containerRef.current && rendererRef.current.domElement) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, [webglSupported]);

  // Handle click
  const handleClick = (event) => {
    if (zoomState !== 'idle' || !laptopGroupRef.current || !cameraRef.current || !raycasterRef.current) return;

    // Calculate mouse position
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Check for intersections
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(laptopGroupRef.current.children, true);

    if (intersects.length > 0) {
      handleZoomIn();
    }
  };

  // Handle touch
  const handleTouch = (event) => {
    if (zoomState !== 'idle') return;
    event.preventDefault();
    handleZoomIn();
  };

  // Zoom in animation
  const handleZoomIn = () => {
    setZoomState('zooming');

    // Animate camera to screen
    gsap.to(cameraRef.current.position, {
      x: 0,
      y: 1.5,
      z: 1.5,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (cameraRef.current) {
          cameraRef.current.lookAt(0, 1.5, -1.35);
        }
      },
      onComplete: () => {
        setZoomState('zoomed');
        setShowAboutContent(true);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      }
    });

    // Fade out laptop
    if (laptopGroupRef.current) {
      gsap.to(laptopGroupRef.current, {
        opacity: 0,
        duration: 1,
        delay: 1
      });
    }
  };

  // WebGL fallback
  if (!webglSupported) {
    return (
      <section className="laptop-scene">
        <div className="webgl-fallback">
          <div className="container">
            <h2>3D Experience Unavailable</h2>
            <p>Your browser doesn't support WebGL. Here's the content:</p>
            <AboutDisplay />
          </div>
        </div>
      </section>
    );
  }

  // Loading state
  if (!assetsLoaded) {
    return (
      <section className="laptop-scene">
        <div className="laptop-scene-loading">
          Loading 3D Scene... {Math.round(loadingProgress)}%
        </div>
      </section>
    );
  }

  return (
    <section className="laptop-scene" id="laptop">
      <div className="laptop-scene-container">
        <div
          ref={containerRef}
          className={`threejs-canvas ${zoomState}`}
          onClick={handleClick}
          onTouchStart={handleTouch}
          style={{
            opacity: showAboutContent ? 0 : 1,
            pointerEvents: showAboutContent ? 'none' : 'auto'
          }}
        />

        {showAboutContent && (
          <div className="about-overlay">
            <AboutDisplay />
          </div>
        )}

        {zoomState === 'idle' && (
          <div className="laptop-hint">
            <p>Click the laptop to explore</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LaptopScene;
