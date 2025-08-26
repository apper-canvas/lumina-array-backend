import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ReaderPage from "@/components/pages/ReaderPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ReaderPage />} />
        <Route path="/reader" element={<ReaderPage />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: "#3B4252",
          color: "#D8DEE9",
          borderRadius: "8px",
          border: "1px solid #4C566A"
        }}
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;