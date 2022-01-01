import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginRequired } from "./components";
import { LoginPage, WorkspacePage } from "./pages";
import ProjectListPage from "./pages/ProjectListPage";
import { MainContent } from "./sections";

const App = (): JSX.Element =>{

  return (
    <Router>
      <Routes>
        <Route path='' element={<LoginPage />} />
        <Route path='projects' element={
          <LoginRequired>
            <ProjectListPage />
          </LoginRequired>
        } />
        <Route path='project/:projectUuid' element={
          <LoginRequired>
            <WorkspacePage/>
          </LoginRequired>
        } >
          <Route path='section/:sectionUuid/note/:noteUuid' element={<MainContent />} />
        </Route>
        {/* <Route path='sample' element={(
          <RequireAuth>
            <SamplePage />
          </RequireAuth>
        )} /> */}
      </Routes>
    </Router>
  );
}

export default App;
