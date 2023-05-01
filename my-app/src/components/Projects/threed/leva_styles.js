


        const colorsStore = useCreateStore();
        const radiiStore = useCreateStore();
        const spaceStore = useCreateStore();
        const fontSizesStore = useCreateStore();
        const sizesStore = useCreateStore();
        const borderWidthsStore = useCreateStore();
        const fontWeightsStore = useCreateStore();
      
        const colors = useControls(
          {
            colors: folder({
              elevation1: "#458588",
              elevation2: "#000000",
              elevation3: "#373C4B",
              accent1: "#ffffff",
              accent2: "#b8bb26",
              accent3: "#3C93FF",
              highlight1: "#535760",
              highlight2: "#8C92A4",
              highlight3: "#FEFEFE",
              vivid1: "#ffcc00"
            })
          },
          { store: colorsStore }
        );
        
      
        const radii = useControls(
          {
            radii: folder({
              xs: "0px",
              sm: "0px",
              lg: "0px"
            })
          },
          { store: radiiStore }
        );
      
        const space = useControls(
          {
            space: folder({
              sm: "6px",
              md: "10px",
              rowGap: "7px",
              colGap: "7px"
            })
          },
          { store: spaceStore }
        );
      
        const fontSizes = useControls(
          {
            fontSizes: folder({
              root: "11px"
            })
          },
          { store: fontSizesStore }
        );
      
        const sizes = useControls(
          {
            sizes: folder({
              rootWidth: "280px",
              controlWidth: "160px",
              scrubberWidth: "8px",
              scrubberHeight: "16px",
              rowHeight: "24px",
              folderHeight: "20px",
              checkboxSize: "16px",
              joystickWidth: "100px",
              joystickHeight: "100px",
              colorPickerWidth: "160px",
              colorPickerHeight: "100px",
              monitorHeight: "60px",
              titleBarHeight: "39px"
            })
          },
          { store: sizesStore }
        );
      
        const borderWidths = useControls(
          {
            borderWidths: folder({
              root: "100px",
              input: "1px",
              focus: "1px",
              hover: "1px",
              active: "1px",
              folder: "1px"
            })
          },
          { store: borderWidthsStore }
        );
      
        const fontWeights = useControls(
          {
            fontWeights: folder({
              label: { value: "normal", options: ["bold", "light"] },
              folder: { value: "normal", options: ["bold", "light"] },
              button: { value: "normal", options: ["bold", "light"] }
            })
          },
          { store: fontWeightsStore }
        );
      
        const theme = {
          colors,
          radii,
          space,
          fontSizes,
          sizes,
          borderWidths,
          fontWeights
        };
      

