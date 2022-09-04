import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import RNBottomSheet, { BottomSheetBackdrop, useBottomSheetTimingConfigs } from "@gorhom/bottom-sheet";
import Handler from "./handler";
import { subscribeTo } from "./events";

interface IModal {
  show: () => void;
}

const BottomSheet = forwardRef<IModal, any>(({ children }, ref) => {
  const refBottomSheet = useRef<RNBottomSheet>(null);

  //------------------

  useEffect(() => {
    subscribeTo("close-bottom-sheet", () => refBottomSheet.current?.forceClose());
  }, [])

  //------------------

  useImperativeHandle(ref, () => ({
    show: () => refBottomSheet.current && refBottomSheet.current.snapToIndex(0),
  }));

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 750,
  });

  //------------------------------

  return (
    <RNBottomSheet
      ref={refBottomSheet}
      index={-1}
      snapPoints={["70%"]}
      animationConfigs={animationConfigs}
      enableContentPanningGesture={false}
      enablePanDownToClose={true}
      keyboardBehavior="interactive"
      android_keyboardInputMode="adjustResize"
      keyboardBlurBehavior="restore"
      handleComponent={Handler}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={4}
          disappearsOnIndex={-1}
          opacity={1}
        />
      )}
    >
      {children}
    </RNBottomSheet>
  )
}
);

type BottomSheet = IModal;

export default BottomSheet;