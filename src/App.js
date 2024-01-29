import { useState } from "react";
// import ReactHlsPlayer from "react-hls-player";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ReactPlayer from "react-player";

import React, { useEffect } from "react";

export default function App() {
  const [hlsUrl, setHlsUrl] = useState(
    "https://cdn.s37dev.com/usama-akmal/1666707001221.m3u8"
  );

  const authToken = "Bearer YOUR_AUTH_TOKEN";

  // Custom function to intercept and modify HTTP requests
  const modifyRequest = (xhr, url) => {
    // Set custom headers for each segment request
    xhr.setRequestHeader("Authorization", authToken);
    // Add any other headers as needed
  };

  // Configuration object with custom function for modifying requests
  const playerConfig = {
    hlsOptions: {
      forceHLS: true,
      xhrSetup: modifyRequest,
    },
  };

  useEffect(() => {
    // Intercept and modify requests made by ReactPlayer
    fetch("http://10.4.85.101:3000/stream")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data);
      });
  }, []);

  return (
    <div className="row justify-content-center">
      <input
        type="text"
        className="form-control w-90 m-2 my-4"
        placeholder="HLS Url..."
        value={hlsUrl}
        aria-label="hls-url"
        aria-describedby="set-hls-url"
        onChange={(e) => setHlsUrl(e.target.value)}
      />
      {/* <ReactHlsPlayer
        src={hlsUrl}
        autoPlay={false}
        controls={true}
        width="60%"
        height="auto"
        hlsConfig={{
          maxLoadingDelay: 4,
          minAutoBitrate: 0,
          lowLatencyMode: true,
          cmcd: {
            useHeaders: true,
          },
          licenseXhrSetup: function (xhr, url, keyContext, licenseChallenge) {
            console.log("🚀 ~ App ~ url:", url);
            let payload = licenseChallenge;

            // Send cookies with request
            xhr.withCredentials = true;

            // Call open to change the method (default is POST), modify the url, or set request headers
            xhr.open("POST", url, true);

            // call xhr.setRequestHeader after xhr.open otherwise licenseXhrSetup will throw and be called a second time after HLS.js call xhr.open
            if (keyContext.keySystem === "com.apple.fps") {
              xhr.setRequestHeader("Content-Type", "application/json");
            } else {
              xhr.setRequestHeader("Content-Type", "application/octet-stream");
            }

            // Return the desired payload or a Promise<Uint8Array>.
            // Not returning a value, or returning `undefined` or` Promise<void>` will result in the `licenseChallenge` being used.
            return xhr;
          },
        }}
      /> */}

      <ReactPlayer
        url={hlsUrl}
        loop
        progressInterval
        controls={true}
        config={{
          file: {
            hlsOptions: {
              // debug: true,
              // forceHLS: true,
              fetchSetup: function (context, initParams) {
                // Always send cookies, even for cross-origin calls.
                initParams.credentials = "include";
                return new Request(context.url, initParams);
              },
              xhrSetup: function (xhr, url) {
                // xhr.open();
                xhr.withCredentials = true; // do send cookie
                // xhr.setRequestHeader(
                //   "Access-Control-Allow-Headers",
                //   "Content-Type, Accept, X-Requested-With, Cookie"
                // );
                // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                // xhr.setRequestHeader(
                //   "Access-Control-Allow-Credentials",
                //   "true"
                // );
                // xhr.setRequestHeader("Cookie", "sessionid=abcdef123456");
                // xhr.setRequestHeader(
                //   "Cookie",
                //   "CloudFront-Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kMnZ5dmsybWFla2psaS5jbG91ZGZyb250Lm5ldC91c2FtYS1ha21hbC8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA2NTQ1NjIyfX19XX0_; CloudFront-Key-Pair-Id=K1CFRNK2GP1JBS; CloudFront-Signature=gp6hJiWWjxVnPfgRrKLT7Da84fkGBIoe5RdhOLJ0qjhHrOJCpk6fdcTV~a6gP5nBKRr3DwK6bITqIsel2oAAKjcUdU0lMMdqGHKATYu~jMr0H4ZQg-eSO8jv85Dayk-6ibUHD3qteSc7ERmu6g6QBH1MV2mUQgDpnmnUbdZZTqdiMmEKRUJ3MuBKymB0kWF0MoxyPua1MvLqs1wH3LBCBrkv3cZcJ2b4En6snrdjjZaDdbcYKU1qsPKWeMLFBkupSYFMKwLrynBzeoLvls3X39i2LqooWNKhxk7rnO7AZfvC8IsxHA8or4X7VIh2ZOt0T~VQi5mZ8~y-X0sYZu7KIQ__"
                // );
                // xhr.setRequestHeader("Cookie", "SESSIONID");
                console.log("🚀 ~ App ~ xhr:", xhr);

                return xhr;
              },
            },
          },
        }}
      />
    </div>
  );
}
