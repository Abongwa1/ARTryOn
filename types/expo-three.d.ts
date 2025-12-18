declare module 'expo-three' {
  import { WebGLRenderingContext } from 'three';
  export class Renderer {
    constructor(params: { gl: WebGLRenderingContext });
    setSize(width: number, height: number): void;
    render(scene: any, camera: any): void;
  }
}
