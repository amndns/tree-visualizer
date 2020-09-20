import { useState, useCallback, useLayoutEffect } from 'react';

interface DimensionObject {
  width: number;
  height: number;
  top: number;
  left: number;
  x: number;
  y: number;
  right: number;
  bottom: number;
}

type UseDimensionsHook = [
  (node: HTMLElement | null) => void,
  DimensionObject,
  HTMLElement | null
];

interface UseDimensionsArgs {
  liveMeasure?: boolean;
}

function getDimensionObject(node: HTMLElement): DimensionObject {
  const rect = node.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    top: 'x' in rect ? rect.x : (rect as DOMRect).top,
    left: 'y' in rect ? rect.y : (rect as DOMRect).left,
    x: 'x' in rect ? rect.x : (rect as DOMRect).left,
    y: 'y' in rect ? rect.y : (rect as DOMRect).top,
    right: rect.right,
    bottom: rect.bottom,
  };
}

function useDimensions({
  liveMeasure = true,
}: UseDimensionsArgs = {}): UseDimensionsHook {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    x: 0,
    y: 0,
    right: 0,
    bottom: 0,
  });
  const [node, setNode] = useState<HTMLElement | null>(null);

  const ref = useCallback((element: HTMLElement | null) => {
    setNode(element);
  }, []);

  useLayoutEffect(() => {
    if (node !== null) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getDimensionObject(node))
        );

      measure();

      if (liveMeasure) {
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', measure);

        return () => {
          window.removeEventListener('resize', measure);
          window.removeEventListener('scroll', measure);
        };
      }
    }

    return () => {};
  }, [liveMeasure, node]);

  return [ref, dimensions, node];
}

export default useDimensions;
