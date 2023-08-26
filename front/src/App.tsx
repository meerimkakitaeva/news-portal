import React from 'react';
import {CssBaseline} from "@mui/material";
import News from "./features/news/News";
import NavigationToolbar from "./components/Toolbar/NavigationToolbar";
import {Route, Routes} from "react-router";
import NewsForm from "./features/news/components/NewsForm";
import FullPost from "./features/news/FullPost";

const App = () => {
  return (
      <>
        <CssBaseline />
          <NavigationToolbar />
          <Routes>
              <Route path="/" element={<News />} />
              <Route path="/new-post" element={<NewsForm />} />
              <Route path="/news/:id" element={<FullPost />} />
          </Routes>
      </>
  );
};

export default App;
