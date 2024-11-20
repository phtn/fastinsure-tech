import { useEffect, useRef } from "react";

export const useRenderDebug = <T>(componentName: string, props: T) => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`[${componentName}] render #${renderCount.current}`, {
      props,
      timestamp: new Date().toISOString(),
    });
  });
};

// // Usage in component:
// function MyComponent(props) {
//   useRenderDebug('MyComponent', props);
//   return <div>Content</div>;
// }
