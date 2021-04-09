import logo from "./logo.svg";
import "./App.css";
import heic2any from "heic2any";
import React from "react";

const App = () => {
  const [imageSource, setImageSource] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const imageStyle = {
    width: "100%",
    height: "auto"
  };
  const handleFileInputChange = async e => {
    // Get the file from the input
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      console.log(
        "Here's the file from the input, presumably .heic (in blob form): ",
        file
      );

      // convert heic file to jpeg file
      const convertedFile = await heic2any({
        blob: file,
        toType: "image/jpeg"
      });
      console.log(
        "Here's the file converted to .jpeg, still in blob form: ",
        convertedFile
      );

      // instantiate filereader
      let reader = new FileReader();

      // define behavior for when filereader loads a file
      reader.onload = async e => {
        console.log(
          "Here is the file info after the FileReader has processed the converted file: ",
          e,
          e.target.result
        );
        setImageSource(e.target.result);
        setIsLoading(false);
      };

      // load the file with the filereader
      reader.readAsDataURL(convertedFile);
    } else {
      // no file was selected
      setIsLoading(false);
      setImageSource(null);
    }
  };
  return (
    <div className="App">
      <p>Convert HEIC to JPEG</p>
      <input
        type="file"
        onChange={handleFileInputChange}
        multiple={false}
        accept=".heic"
      />
      <img style={imageStyle} src={isLoading ? logo : imageSource} />
    </div>
  );
};

export default App;
