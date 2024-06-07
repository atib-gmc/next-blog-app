import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { CommandMenu } from "./CommandMenu";

export default function Resizeable({ children }: { children: ReactNode }) {
  // const [windowSize, setWindowSize] = useState(getWindowSize());
  //
  // async function getWindowSize() {
  //   const { innerWidth, innerHeight } = window && window;
  //   return { innerWidth, innerHeight };
  // }
  // useEffect(() => {
  //   function handleWindowResize() {
  //     setWindowSize(getWindowSize());
  //   }
  //
  //   // Add an event listener for window resize
  //   window.addEventListener('resize', handleWindowResize);
  //
  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('resize', handleWindowResize);
  //   };
  // }, []);

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen h-full   rounded-lg border w-full "
      >
        <ResizablePanel defaultSize={10} minSize={5} maxSize={10}>
          <CommandMenu />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">{children}</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

