/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";

function postMessageToExternalListeners(data: any) {
  window.parent.postMessage(JSON.stringify(data), "*");
}

function App() {
  const searchParams = new URLSearchParams(document.location.search);
  const publicKey = searchParams.get("publicKey");
  const meta = searchParams.get("meta");

  return (
    <>
      <h3>This SDK right here is not serving purpose</h3>
      <p>
        Instead, it's a valuable resource that serves as a guiding light for
        fellow developers. The primary goal here is to show you how you can
        create your own SDKs, empowering you with the knowledge and tools to
        build amazing solutions tailored to your needs.
      </p>
      <div className='card'>
        <h3>PublicKey: {publicKey}</h3>
        {meta && (
          <>
            {Object.entries(JSON.parse(meta)).map(
              ([key, value]: any, index) => {
                return (
                  <pre style={{ textAlign: "left" }} key={index}>
                    {key}: {value}
                  </pre>
                );
              }
            )}
          </>
        )}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => {
            const data = {
              event: "WIDGET_CLOSED",
              data: {
                message: "Widget Closed",
                meta,
                timeStamps: new Date(),
              },
            };
            postMessageToExternalListeners(data);
          }}
        >
          Close Widget
        </button>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
