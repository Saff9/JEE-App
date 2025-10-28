// app/page.js
'use client';
import { useState, useEffect } from 'react';
import { Play, BookOpen, Download, Search, User, Bell, Plus, Upload, Video, X } from 'lucide-react';

// Move sampleVideos outside the component to avoid serialization issues
const sampleVideos = {
  physics: [
    {
      id: 1,
      title: 'Modern Physics - Dual Nature of Radiation',
      youtubeId: '9C6utZ7g-8I',
      duration: '45:30',
      notes: '#',
      subject: 'Physics',
      chapter: 'Modern Physics',
      teacher: 'Dr. Sharma'
    },
    {
      id: 2,
      title: 'Electrostatics - Electric Field & Potential',
      youtubeId: 'dQw4w9WgXcQ',
      duration: '38:15',
      notes: '#',
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
      notes: '#',
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
      notes: '#',
      subject: 'Mathematics',
      chapter: 'Calculus',
      teacher: 'Dr. Kumar'
    }
  ]
};

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('physics');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '', 
    youtubeUrl: '', 
    subject: 'physics', 
    chapter: '', 
    duration: '', 
    notes: null
  });

  useEffect(() => {
    setVideos(sampleVideos[activeTab] || []);
    if (sampleVideos[activeTab] && sampleVideos[activeTab].length > 0) {
      setSelectedVideo(sampleVideos[activeTab][0]);
    }
  }, [activeTab]);

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.chapter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedVideo(sampleVideos[tab]?.[0] || null);
  };

  const extractYouTubeId = (url) => {
    if (!url) return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    const youtubeId = extractYouTubeId(formData.youtubeUrl);
    if (!youtubeId) {
      alert('Please enter a valid YouTube URL');
      return;
    }
    alert('Video added successfully!');
    setFormData({ 
      title: '', 
      youtubeUrl: '', 
      subject: 'physics', 
      chapter: '', 
      duration: '', 
      notes: null 
    });
    setIsAdminOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData({...formData, notes: file});
    } else if (file) {
      alert('Please select a PDF file');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
          {/* Video List */}
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

          {/* Video Player & Content */}
          <div className="lg:col-span-3">
            {selectedVideo ? (
              <div className="bg-white rounded-lg shadow-sm border">
                {/* Video Player */}
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

                {/* Video Info */}
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

      {/* Admin Panel */}
      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50 flex items-center justify-center"
      >
        <Plus className="h-6 w-6" />
      </button>

      {isAdminOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Add New Lecture</h2>
              <button
                onClick={() => setIsAdminOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAdminSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lecture Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter lecture title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  YouTube URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="mathematics">Mathematics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., 45:30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chapter *
                </label>
                <input
                  type="text"
                  required
                  value={formData.chapter}
                  onChange={(e) => setFormData({...formData, chapter: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter chapter name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lecture Notes (PDF)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-400">PDF files only</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {formData.notes && (
                  <p className="text-sm text-green-600 mt-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {formData.notes.name}
                  </p>
                )}
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAdminOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Add Lecture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
