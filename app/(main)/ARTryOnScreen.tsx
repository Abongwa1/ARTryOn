import { GLView } from 'expo-gl';
import React, { useRef } from 'react';
import { Dimensions, PanResponder, StyleSheet, View } from 'react-native';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const { width, height } = Dimensions.get('window');

type Props = {
  modelUrl: string;
};

export default function ARTryOnScreen({ modelUrl }: Props) {
  const rotation = useRef({ x: 0, y: 0 }).current;
  const scaleRef = useRef(1).current;
  const modelRef = useRef<THREE.Group | null>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        rotation.y += gestureState.dx * 0.005;
        rotation.x += gestureState.dy * 0.005;
      },
    })
  ).current;

  const onContextCreate = async (gl: WebGLRenderingContext) => {
    // Renderer
    const renderer = new THREE.WebGLRenderer({ context: gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor(0x050816, 1);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 2;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 2, 2);
    scene.add(directionalLight);

    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(scaleRef, scaleRef, scaleRef);
        modelRef.current = model;
        scene.add(model);
      },
      undefined,
      (error) => console.error('Error loading model:', error)
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (modelRef.current) {
        modelRef.current.rotation.x = rotation.x;
        modelRef.current.rotation.y = rotation.y;
      }

      renderer.render(scene, camera);
      (gl as any).endFrameEXP?.(); // Required for expo-gl
    };

    animate();
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <GLView style={styles.glView} onContextCreate={onContextCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
  },
  glView: {
    width: '100%',
    height: '100%',
  },
});
