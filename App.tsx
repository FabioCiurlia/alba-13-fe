import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { ArticleDetail } from './components/ArticleDetail';
import { TrainingArchive } from './components/TrainingArchive';
import { BlogArchive } from './components/BlogArchive';
import { AthleteArchive } from './components/AthleteArchive';
import { ClubType } from './types';

export default function App() {
  const [activeClub, setActiveClub] = useState<ClubType>('alba13');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home activeClub={activeClub} setActiveClub={setActiveClub} />} />
        <Route path="/training" element={<TrainingArchive activeClub={activeClub} setActiveClub={setActiveClub} />} />
        <Route path="/news" element={<BlogArchive activeClub={activeClub} setActiveClub={setActiveClub} />} />
        <Route path="/athletes" element={<AthleteArchive activeClub={activeClub} setActiveClub={setActiveClub} />} />
        <Route path="/blog/:slug" element={<ArticleDetail activeClub={activeClub} setActiveClub={setActiveClub} />} />
        <Route path="*" element={<Home activeClub={activeClub} setActiveClub={setActiveClub} />} />
      </Routes>
    </Router>
  );
}