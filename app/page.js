// app/page.js
'use client';
import { useState, useEffect } from 'react';
import { Play, BookOpen, Download, Search, User, Bell } from 'lucide-react';
import AdminPanel from '../components/AdminPanel';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('physics');
  const [searchTerm, setSearchTerm] = useState('');

  const sampleVideos = {
    physics: [
      {
        id: 1,
        title: 'Modern Physics - Dual Nature of Radiation',
        youtubeId: 'dQw4w9WgXcQ',
        duration: '45:30',
        notes: 'https://example.com/notes/modern-physics.pdf',
        subject: 'Physics',
        chapter: 'Modern Physics',
        teacher: 'Dr. Sharma'
      },
      {
        id: 2,
        title: 'Electrostatics - Electric Field & Potential',
        youtubeId: 'dQw4w9WgXcQ',
        duration: '38:15',
        notes: 'https://example.com/notes/electrostatics.pdf',
        subject: 'Physics',
        chapter: 'Electrostatics',
        teacher: 'Prof. Gupta'
      }
    ],
    chemistry: [
      {
        id: 3,
        title: 'Organic Chemistry - Reaction Mechanisms',
        youtubeId: 'dQw4w9WgXcQ',
        duration: '52:20',
        notes: 'https://example.com/notes/organic-chemistry.pdf',
        subject: 'Chemistry',
        chapter: 'Organic Chemistry',
        teacher: 'Dr. Reddy'
      }
    ],
    mathematics: [
      {
        id: 4,
        title: 'Calculus - Integration Techniques',
        youtubeId: 'dQw4w9WgXcQ',
        duration: '41:10',
        notes: 'https://example.com/notes/calculus.pdf',
        subject: 'Mathematics',
        chapter: 'Calculus',
        teacher: 'Dr. Kumar'
      }
    ]
  };

  useEffect(() => {
    setVideos(sampleVideos[activeTab]);
    if (sampleVideos[activeTab].length > 0 && !selectedVideo) {
      setSelectedVideo(sampleVideos[activeTab][0]);
    }
  }, [activeTab]);

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.chapter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedVideo(sampleVideos[tab][0] || null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">JEE Prep Pro</span>
              </div>
              
              <nav className="hidden md:ml-8 md:flex space-x-8">
                {['physics', 'chemistry', 'mathematics'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-3 py-2 rounded-md text-sm font-medium capitalize ${
                      activeTab === tab 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search lectures..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Lecture Series</h2>
                <p className="text-sm text-gray-500">JEE Main & Advanced 2024</p>
              </div>
              
              <div className="max-h-[600px] overflow-y-auto">
                <div className="p-4 space-y-4">
                  {filteredVideos.map((video) => (
                    <div
                      key={video.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedVideo?.id === video.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedVideo(video)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-4 h-4 mt-1">
                          <Play className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                            {video.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {video.chapter} • {video.duration}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-blue-600 font-medium">
                              {video.teacher}
                            </span>
                            {video.notes && (
                              <button 
                                className="text-xs text-green-600 hover:text-green-700 flex items-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(video.notes, '_blank');
                                }}
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Notes
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {selectedVideo ? (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="bg-black rounded-t-lg">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?rel=0`}
                      className="w-full h-96 rounded-t-lg"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      title={selectedVideo.title}
                    />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {selectedVideo.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {selectedVideo.subject}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{selectedVideo.chapter}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-blue-600 font-medium">{selectedVideo.teacher}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {selectedVideo.notes && (
                        <button 
                          className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          onClick={() => window.open(selectedVideo.notes, '_blank')}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Notes
                        </button>
                      )}
                      <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Practice Questions
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Study Materials
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                        <h4 className="font-medium text-gray-900">Quick Revision Notes</h4>
                        <p className="text-sm text-gray-500 mt-1">Key formulas and concepts</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                        <h4 className="font-medium text-gray-900">Practice Problems</h4>
                        <p className="text-sm text-gray-500 mt-1">Chapter-wise questions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                <Play className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">
                  Select a lecture to start learning
                </h3>
                <p className="text-gray-400">
                  Choose from the list of available lectures on the left
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AdminPanel />
    </div>
  );
}
