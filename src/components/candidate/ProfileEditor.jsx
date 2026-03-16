import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  MapPin,
  Briefcase,
  Camera,
  Save,
  Edit2,
  Loader2,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Linkedin,
  Github,
  Globe,
  GraduationCap,
  Code,
  Image as ImageIcon,
  Download,
  Coffee,
  ExternalLink,
  Twitter,
  Brain,
  Heart,
  BookOpen,
  Check,
  X,
} from 'lucide-react';
import { useProfileStore } from '../../core/stores/profileStore';

// --- THEME ---
const THEME = {
  appBg: 'bg-transparent',
  cardBg: 'bg-white dark:bg-[#0a0a0a]',
  text: 'text-gray-600 dark:text-gray-400',
  heading: 'text-gray-900 dark:text-white font-black tracking-tight',
  accent: 'text-teal-600 dark:text-teal-400',
  primary: 'bg-teal-600',
  border: 'border-gray-200 dark:border-white/10',
  button: 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-500/20',
};

const defaultProfile = {
  firstName: '',
  lastName: '',
  profession: '',
  bio: '',
  email: '',
  phone: '',
  location: '',
  age: '',
  residence: '',
  address: '',
  workStatus: 'Available',
  googleFormUrl: '',
  socials: {
    linkedin: '',
    github: '',
    twitter: '',
    website: '',
  },
  experience: [],
  education: [],
  services: [],
  projects: [],
  testimonials: [],
  skills: {
    technical: [],
    core: [],
    soft: [],
    knowledge: [],
  },
  avatar: '',
  banner: '',
  resumeUrl: '',
  resumeName: '',
};

const createId = () => Date.now() + Math.random();

const ensureIds = (list = []) => {
  if (!Array.isArray(list)) return [];
  return list.map((item) => ({
    ...item,
    id: item?.id || createId(),
  }));
};

const normalizeProfile = (data) => {
  if (!data) return defaultProfile;

  return {
    ...defaultProfile,
    ...data,
    socials: {
      ...defaultProfile.socials,
      ...(data.socials || {}),
    },
    experience: ensureIds(data.experience || []),
    education: ensureIds(data.education || []),
    services: ensureIds(data.services || []),
    projects: ensureIds(data.projects || []),
    testimonials: ensureIds(data.testimonials || []),
    skills: {
      technical: ensureIds(data.skills?.technical || []),
      core: ensureIds(data.skills?.core || []),
      soft: ensureIds(data.skills?.soft || []),
      knowledge: ensureIds(data.skills?.knowledge || []),
    },
  };
};

const ProfileEditor = () => {
  const { profileData, setProfileData } = useProfileStore();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('resume');
  const [notification, setNotification] = useState(null);

  const [profile, setProfile] = useState(defaultProfile);

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const normalized = normalizeProfile(profileData);
    setProfile(normalized);
    setLoading(false);
  }, [profileData]);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    };
  }, [avatarPreview, bannerPreview]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'avatar') {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      setProfile((prev) => ({
        ...prev,
        avatar: url,
      }));
      showNotification('Avatar selected successfully.');
    }

    if (type === 'banner') {
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
      const url = URL.createObjectURL(file);
      setBannerPreview(url);
      setProfile((prev) => ({
        ...prev,
        banner: url,
      }));
      showNotification('Banner selected successfully.');
    }

    if (type === 'resume') {
      const url = URL.createObjectURL(file);
      setProfile((prev) => ({
        ...prev,
        resumeUrl: url,
        resumeName: file.name,
      }));
      showNotification('Resume selected successfully.');
    }
  };

  const handleSave = () => {
    setSaving(true);

    setTimeout(() => {
      const normalized = normalizeProfile(profile);
      const finalProfile = {
        ...normalized,
        name: `${normalized.firstName || ''} ${normalized.lastName || ''}`.trim(),
        headline: normalized.profession || '',
      };

      setProfileData(finalProfile);
      setProfile(finalProfile);
      setSaving(false);
      setIsEditing(false);
      showNotification('Profile saved successfully!');
    }, 500);
  };

  const updateList = (listName, id, field, value) => {
    setProfile((prev) => ({
      ...prev,
      [listName]: prev[listName].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addToList = (listName, template) => {
    setProfile((prev) => ({
      ...prev,
      [listName]: [...prev[listName], { ...template, id: createId() }],
    }));
  };

  const removeFromList = (listName, id) => {
    setProfile((prev) => ({
      ...prev,
      [listName]: prev[listName].filter((item) => item.id !== id),
    }));
  };

  const addSkill = (category) => {
    const baseSkill =
      category === 'soft' || category === 'knowledge'
        ? { id: createId(), name: 'New Skill' }
        : { id: createId(), name: 'New Skill', percentage: 50 };

    setProfile((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...prev.skills[category], baseSkill],
      },
    }));
  };

  const updateSkill = (category, id, field, value) => {
    setProfile((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].map((skill) =>
          skill.id === id ? { ...skill, [field]: value } : skill
        ),
      },
    }));
  };

  const removeSkill = (category, id) => {
    setProfile((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((skill) => skill.id !== id),
      },
    }));
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-teal-600" size={40} />
      </div>
    );
  }

  const displayResumeUrl = profile.resumeUrl;
  const displayBanner =
    bannerPreview ||
    profile.banner ||
    'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1000&q=80';

  const displayAvatar = avatarPreview || profile.avatar;

  return (
    <div className="w-full max-w-7xl mx-auto animate-in fade-in duration-500 font-sans pb-20">
      <input
        type="file"
        ref={avatarInputRef}
        onChange={(e) => handleFileChange(e, 'avatar')}
        className="hidden"
        accept="image/*"
      />
      <input
        type="file"
        ref={bannerInputRef}
        onChange={(e) => handleFileChange(e, 'banner')}
        className="hidden"
        accept="image/*"
      />
      <input
        type="file"
        ref={resumeInputRef}
        onChange={(e) => handleFileChange(e, 'resume')}
        className="hidden"
        accept=".pdf,.doc,.docx"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        <div className="lg:col-span-4">
          <div className={`${THEME.cardBg} ${THEME.border} border rounded-3xl shadow-xl overflow-hidden sticky top-24`}>
            <div className="h-40 relative w-full bg-slate-100 dark:bg-[#111] group">
              <img
                src={displayBanner}
                className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-70"
                alt="Banner"
              />
              {isEditing && (
                <button
                  onClick={() => bannerInputRef.current?.click()}
                  className="absolute top-4 right-4 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 backdrop-blur-sm transition-all"
                >
                  <Camera size={16} />
                </button>
              )}
            </div>

            <div className="px-6 pb-8 text-center -mt-16 relative z-10">
              <div className="w-32 h-32 mx-auto rounded-3xl border-[6px] border-white dark:border-[#0a0a0a] overflow-hidden shadow-2xl bg-white relative group/avatar">
                {displayAvatar ? (
                  <img src={displayAvatar} className="w-full h-full object-cover" alt="Avatar" />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300 font-black text-3xl">
                    {profile.firstName ? profile.firstName[0] : 'U'}
                  </div>
                )}
                {isEditing && (
                  <button
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity text-white"
                  >
                    <Camera size={24} />
                  </button>
                )}
              </div>

              <div className="mt-4 space-y-1">
                {isEditing ? (
                  <div className="flex gap-2 justify-center mb-2">
                    <input
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      className="text-xl font-black bg-gray-50 dark:bg-white/10 border-b border-gray-200 dark:border-white/10 w-1/2 text-center rounded p-1"
                      placeholder="First Name"
                    />
                    <input
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      className="text-xl font-black bg-gray-50 dark:bg-white/10 border-b border-gray-200 dark:border-white/10 w-1/2 text-center rounded p-1"
                      placeholder="Last Name"
                    />
                  </div>
                ) : (
                  <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                    {profile.firstName} {profile.lastName}
                  </h1>
                )}

                {isEditing ? (
                  <input
                    value={profile.profession}
                    onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
                    placeholder="Professional Title"
                    className="text-sm font-medium text-center bg-transparent border-b border-gray-200 dark:border-white/10 w-full outline-none text-teal-600 dark:text-teal-400"
                  />
                ) : (
                  <div className="inline-block px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
                    {profile.profession || 'Add Professional Title'}
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-3 mt-6">
                {[
                  { icon: Linkedin, key: 'linkedin' },
                  { icon: Github, key: 'github' },
                  { icon: Twitter, key: 'twitter' },
                  { icon: Globe, key: 'website' },
                ].map((soc, i) => {
                  const href = profile.socials?.[soc.key] || '#';
                  return (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-500 hover:bg-teal-500 hover:text-white transition-all shadow-sm"
                    >
                      <soc.icon size={18} />
                    </a>
                  );
                })}
              </div>

              {isEditing && (
                <div className="mt-6 space-y-2 text-left bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-200 dark:border-white/10">
                  <p className="text-[10px] font-bold uppercase text-gray-400 mb-2">Update Links</p>
                  {Object.keys(profile.socials).map((key) => (
                    <div
                      key={key}
                      className="flex items-center gap-2 bg-white dark:bg-[#0a0a0a] p-2 rounded-lg border border-gray-200 dark:border-white/5"
                    >
                      <Globe size={14} className="text-gray-400" />
                      <input
                        value={profile.socials[key]}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            socials: {
                              ...profile.socials,
                              [key]: e.target.value,
                            },
                          })
                        }
                        placeholder={`${key} url...`}
                        className="w-full text-xs bg-transparent outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3 mt-8 pt-8 border-t border-gray-100 dark:border-white/10">
                {isEditing ? (
                  <button
                    onClick={() => resumeInputRef.current?.click()}
                    className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white font-bold text-xs hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                  >
                    {profile.resumeName ? 'Resume Attached' : 'Upload Resume'}
                  </button>
                ) : (
                  <a
                    href={displayResumeUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    download={displayResumeUrl ? profile.resumeName || `resume_${profile.firstName || 'user'}` : undefined}
                    className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      !displayResumeUrl
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-900 text-white dark:bg-white dark:text-black hover:-translate-y-1 shadow-lg'
                    }`}
                  >
                    DOWNLOAD CV <Download size={14} />
                  </a>
                )}

                {!isEditing && (
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="flex-1 py-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 font-bold text-xs hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors"
                  >
                    CONTACT ME
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className={`${THEME.cardBg} ${THEME.border} border rounded-3xl shadow-xl min-h-[600px] flex flex-col relative`}>
            <div className="p-2 m-2 bg-gray-50 dark:bg-[#111] rounded-2xl flex flex-wrap gap-1 border border-gray-200 dark:border-white/5">
              {[
                { id: 'about', label: 'About Me', icon: User },
                { id: 'resume', label: 'Resume', icon: Briefcase },
                { id: 'projects', label: 'Projects', icon: Code },
                { id: 'contact', label: 'Contact', icon: MapPin },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all flex-1 md:flex-none justify-center ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-[#0a0a0a] text-teal-600 dark:text-teal-400 shadow-sm border border-gray-200 dark:border-white/10'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <tab.icon size={16} className={activeTab === tab.id ? 'text-teal-500' : 'opacity-50'} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8 md:p-10 flex-1 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                {activeTab === 'about' && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <h2 className={`${THEME.heading} text-2xl`}>About Me</h2>
                        {isEditing ? (
                          <textarea
                            value={profile.bio}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            className="w-full h-48 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 outline-none text-sm leading-relaxed resize-none"
                            placeholder="Write your profile summary..."
                          />
                        ) : (
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                            {profile.bio || 'No summary available.'}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        {[
                          { label: 'Age', key: 'age', val: profile.age },
                          { label: 'Residence', key: 'residence', val: profile.residence },
                          { label: 'Address', key: 'address', val: profile.address },
                          { label: 'Location', key: 'location', val: profile.location },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-3"
                          >
                            <span className="bg-teal-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                              {item.label} .....
                            </span>
                            {isEditing ? (
                              <input
                                value={item.val}
                                onChange={(e) => setProfile({ ...profile, [item.key]: e.target.value })}
                                className="text-right bg-transparent outline-none border-b border-dashed border-gray-300 w-32"
                              />
                            ) : (
                              <span className="font-medium text-gray-700 dark:text-gray-300">
                                {item.val || '-'}
                              </span>
                            )}
                          </div>
                        ))}

                        <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-3">
                          <span className="bg-teal-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            Freelance .....
                          </span>
                          {isEditing ? (
                            <select
                              value={profile.workStatus}
                              onChange={(e) => setProfile({ ...profile, workStatus: e.target.value })}
                              className="bg-transparent text-sm"
                            >
                              <option value="Available">Available</option>
                              <option value="Busy">Busy</option>
                            </select>
                          ) : (
                            <span className="font-medium text-emerald-500">
                              {profile.workStatus || 'Available'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-12">
                      <div className="flex justify-between items-end mb-6">
                        <h2 className={`${THEME.heading} text-2xl`}>My Services</h2>
                        {isEditing && (
                          <button
                            onClick={() => addToList('services', { title: 'Service', desc: 'Description...' })}
                            className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold"
                          >
                            + Add
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {profile.services.map((srv) => (
                          <div
                            key={srv.id}
                            className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-teal-500/30 transition-all group"
                          >
                            <div className="w-12 h-12 rounded-xl bg-teal-500 text-white flex items-center justify-center mb-4 shadow-lg shadow-teal-500/30">
                              <Code size={24} />
                            </div>

                            {isEditing ? (
                              <div className="space-y-2">
                                <input
                                  value={srv.title || ''}
                                  onChange={(e) => updateList('services', srv.id, 'title', e.target.value)}
                                  className="w-full font-bold bg-white dark:bg-[#0a0a0a] p-2 rounded"
                                  placeholder="Service title"
                                />
                                <textarea
                                  value={srv.desc || ''}
                                  onChange={(e) => updateList('services', srv.id, 'desc', e.target.value)}
                                  className="w-full text-xs bg-white dark:bg-[#0a0a0a] p-2 rounded h-16"
                                  placeholder="Service description"
                                />
                                <button
                                  onClick={() => removeFromList('services', srv.id)}
                                  className="text-red-500 text-xs font-bold"
                                >
                                  Remove
                                </button>
                              </div>
                            ) : (
                              <>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                  {srv.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                  {srv.desc}
                                </p>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'resume' && (
                  <motion.div
                    key="resume"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <h2 className={`${THEME.heading} text-2xl mb-8`}>Resume</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 bg-teal-50 dark:bg-white/5 rounded-lg text-teal-600">
                            <Briefcase size={20} />
                          </div>
                          <h3 className="text-lg font-bold">Experience</h3>
                          {isEditing && (
                            <button
                              onClick={() =>
                                addToList('experience', {
                                  role: 'Role',
                                  company: 'Company',
                                  date: '2024',
                                  desc: 'Description...',
                                })
                              }
                              className="ml-auto text-xs bg-gray-100 px-2 rounded"
                            >
                              + Add
                            </button>
                          )}
                        </div>

                        <div className="space-y-8 pl-4 border-l-2 border-gray-100 dark:border-white/5">
                          {profile.experience.map((exp) => (
                            <div key={exp.id} className="relative pl-6">
                              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-white dark:border-[#0a0a0a] bg-teal-500 shadow-sm" />

                              {isEditing ? (
                                <div className="space-y-2 bg-gray-50 dark:bg-white/5 p-3 rounded-lg">
                                  <input
                                    value={exp.role || ''}
                                    onChange={(e) => updateList('experience', exp.id, 'role', e.target.value)}
                                    className="w-full font-bold bg-white dark:bg-[#0a0a0a] p-1"
                                    placeholder="Role"
                                  />
                                  <input
                                    value={exp.company || ''}
                                    onChange={(e) => updateList('experience', exp.id, 'company', e.target.value)}
                                    className="w-full text-xs bg-white dark:bg-[#0a0a0a] p-1"
                                    placeholder="Company"
                                  />
                                  <input
                                    value={exp.date || ''}
                                    onChange={(e) => updateList('experience', exp.id, 'date', e.target.value)}
                                    className="w-full text-xs bg-white dark:bg-[#0a0a0a] p-1"
                                    placeholder="Date"
                                  />
                                  <textarea
                                    value={exp.desc || ''}
                                    onChange={(e) => updateList('experience', exp.id, 'desc', e.target.value)}
                                    className="w-full text-xs bg-white dark:bg-[#0a0a0a] p-1 h-12"
                                    placeholder="Description"
                                  />
                                  <button
                                    onClick={() => removeFromList('experience', exp.id)}
                                    className="text-red-500 text-xs"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <span className="text-xs font-bold text-teal-600 border border-teal-100 bg-teal-50 px-2 py-0.5 rounded">
                                    {exp.date}
                                  </span>
                                  <h4 className="text-lg font-black text-gray-900 dark:text-white mt-1">
                                    {exp.role}
                                  </h4>
                                  <p className="text-sm font-medium text-gray-500 mb-2">{exp.company}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{exp.desc}</p>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 bg-teal-50 dark:bg-white/5 rounded-lg text-teal-600">
                            <GraduationCap size={20} />
                          </div>
                          <h3 className="text-lg font-bold">Education</h3>
                          {isEditing && (
                            <button
                              onClick={() =>
                                addToList('education', {
                                  degree: 'Degree',
                                  school: 'School',
                                  date: '2022',
                                  desc: 'Description...',
                                })
                              }
                              className="ml-auto text-xs bg-gray-100 px-2 rounded"
                            >
                              + Add
                            </button>
                          )}
                        </div>

                        <div className="space-y-8 pl-4 border-l-2 border-gray-100 dark:border-white/5">
                          {profile.education.map((edu) => (
                            <div key={edu.id} className="relative pl-6">
                              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-white dark:border-[#0a0a0a] bg-teal-500 shadow-sm" />

                              {isEditing ? (
                                <div className="space-y-2 bg-gray-50 dark:bg-white/5 p-3 rounded-lg">
                                  <input
                                    value={edu.degree || ''}
                                    onChange={(e) => updateList('education', edu.id, 'degree', e.target.value)}
                                    className="w-full font-bold bg-white dark:bg-[#0a0a0a] p-1"
                                    placeholder="Degree"
                                  />
                                  <input
                                    value={edu.school || ''}
                                    onChange={(e) => updateList('education', edu.id, 'school', e.target.value)}
                                    className="w-full text-xs bg-white dark:bg-[#0a0a0a] p-1"
                                    placeholder="School"
                                  />
                                  <input
                                    value={edu.date || ''}
                                    onChange={(e) => updateList('education', edu.id, 'date', e.target.value)}
                                    className="w-full text-xs bg-white dark:bg-[#0a0a0a] p-1"
                                    placeholder="Date"
                                  />
                                  <textarea
                                    value={edu.desc || ''}
                                    onChange={(e) => updateList('education', edu.id, 'desc', e.target.value)}
                                    className="w-full text-xs bg-white dark:bg-[#0a0a0a] p-1 h-12"
                                    placeholder="Description"
                                  />
                                  <button
                                    onClick={() => removeFromList('education', edu.id)}
                                    className="text-red-500 text-xs"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <span className="text-xs font-bold text-teal-600 border border-teal-100 bg-teal-50 px-2 py-0.5 rounded">
                                    {edu.date}
                                  </span>
                                  <h4 className="text-lg font-black text-gray-900 dark:text-white mt-1">
                                    {edu.degree}
                                  </h4>
                                  <p className="text-sm font-medium text-gray-500 mb-2">{edu.school}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{edu.desc}</p>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 pt-12 border-t border-gray-100 dark:border-white/5">
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8">
                        Professional Skills
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                        <div>
                          <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                              <Code size={18} className="text-teal-600" />
                              <h4 className="text-lg font-bold">Technical Skills</h4>
                            </div>
                            {isEditing && (
                              <button
                                onClick={() => addSkill('technical')}
                                className="text-xs bg-teal-50 text-teal-600 px-2 py-1 rounded font-bold"
                              >
                                + Add
                              </button>
                            )}
                          </div>

                          <div className="space-y-5">
                            {profile.skills.technical.map((skill) => (
                              <div key={skill.id}>
                                <div className="flex justify-between mb-2 gap-3">
                                  {isEditing ? (
                                    <input
                                      value={skill.name || ''}
                                      onChange={(e) =>
                                        updateSkill('technical', skill.id, 'name', e.target.value)
                                      }
                                      className="font-bold bg-gray-50 dark:bg-white/5 p-1 text-sm border-b flex-1"
                                    />
                                  ) : (
                                    <span className="font-bold text-gray-700 dark:text-gray-200 text-sm">
                                      {skill.name}
                                    </span>
                                  )}

                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={skill.percentage ?? 50}
                                      onChange={(e) =>
                                        updateSkill('technical', skill.id, 'percentage', e.target.value)
                                      }
                                      className="w-16 bg-gray-50 dark:bg-white/5 p-1 text-right border-b"
                                    />
                                  ) : (
                                    <span className="text-gray-400 text-xs">{skill.percentage}%</span>
                                  )}
                                </div>

                                <div className="h-2 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-teal-500 rounded-full"
                                    style={{ width: `${skill.percentage || 0}%` }}
                                  />
                                </div>

                                {isEditing && (
                                  <button
                                    onClick={() => removeSkill('technical', skill.id)}
                                    className="text-[10px] text-red-500 mt-1"
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                              <Brain size={18} className="text-purple-600" />
                              <h4 className="text-lg font-bold">Core Skills</h4>
                            </div>
                            {isEditing && (
                              <button
                                onClick={() => addSkill('core')}
                                className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded font-bold"
                              >
                                + Add
                              </button>
                            )}
                          </div>

                          <div className="space-y-5">
                            {profile.skills.core.map((skill) => (
                              <div key={skill.id}>
                                <div className="flex justify-between mb-2 gap-3">
                                  {isEditing ? (
                                    <input
                                      value={skill.name || ''}
                                      onChange={(e) => updateSkill('core', skill.id, 'name', e.target.value)}
                                      className="font-bold bg-gray-50 dark:bg-white/5 p-1 text-sm border-b flex-1"
                                    />
                                  ) : (
                                    <span className="font-bold text-gray-700 dark:text-gray-200 text-sm">
                                      {skill.name}
                                    </span>
                                  )}

                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={skill.percentage ?? 50}
                                      onChange={(e) =>
                                        updateSkill('core', skill.id, 'percentage', e.target.value)
                                      }
                                      className="w-16 bg-gray-50 dark:bg-white/5 p-1 text-right border-b"
                                    />
                                  ) : (
                                    <span className="text-gray-400 text-xs">{skill.percentage}%</span>
                                  )}
                                </div>

                                <div className="h-2 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-purple-500 rounded-full"
                                    style={{ width: `${skill.percentage || 0}%` }}
                                  />
                                </div>

                                {isEditing && (
                                  <button
                                    onClick={() => removeSkill('core', skill.id)}
                                    className="text-[10px] text-red-500 mt-1"
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                              <Heart size={18} className="text-rose-500" />
                              <h4 className="text-lg font-bold">Soft Skills</h4>
                            </div>
                            {isEditing && (
                              <button
                                onClick={() => addSkill('soft')}
                                className="text-xs bg-rose-50 text-rose-600 px-2 py-1 rounded font-bold"
                              >
                                + Add
                              </button>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-3">
                            {profile.skills.soft.map((skill) => (
                              <div key={skill.id} className="group relative">
                                {isEditing ? (
                                  <div className="flex items-center gap-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-3 py-1.5 rounded-full">
                                    <input
                                      value={skill.name || ''}
                                      onChange={(e) => updateSkill('soft', skill.id, 'name', e.target.value)}
                                      className="bg-transparent text-sm font-medium w-24 outline-none"
                                    />
                                    <button
                                      onClick={() => removeSkill('soft', skill.id)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <X size={12} />
                                    </button>
                                  </div>
                                ) : (
                                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-50 dark:bg-white/5 text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-white/5 hover:border-teal-500 hover:text-teal-600 transition-colors cursor-default">
                                    {skill.name}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                              <BookOpen size={18} className="text-blue-500" />
                              <h4 className="text-lg font-bold">Knowledge</h4>
                            </div>
                            {isEditing && (
                              <button
                                onClick={() => addSkill('knowledge')}
                                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold"
                              >
                                + Add
                              </button>
                            )}
                          </div>

                          <div className="space-y-3">
                            {profile.skills.knowledge.map((k) => (
                              <div
                                key={k.id}
                                className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400"
                              >
                                <Check size={16} className="text-teal-500" />
                                {isEditing ? (
                                  <div className="flex gap-2 w-full">
                                    <input
                                      value={k.name || ''}
                                      onChange={(e) =>
                                        updateSkill('knowledge', k.id, 'name', e.target.value)
                                      }
                                      className="flex-1 bg-gray-50 dark:bg-white/5 p-1 rounded border-b outline-none"
                                    />
                                    <button onClick={() => removeSkill('knowledge', k.id)}>
                                      <X size={14} className="text-red-500" />
                                    </button>
                                  </div>
                                ) : (
                                  <span>{k.name}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'projects' && (
                  <motion.div
                    key="projects"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h2 className={`${THEME.heading} text-2xl`}>Recent Projects</h2>
                      {isEditing && (
                        <button
                          onClick={() =>
                            addToList('projects', {
                              title: 'Project',
                              category: 'Category',
                              image: '',
                              link: '',
                              desc: 'Description...',
                            })
                          }
                          className="bg-teal-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-teal-500/20"
                        >
                          + New Project
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profile.projects.map((proj) => (
                        <div
                          key={proj.id}
                          className="group rounded-2xl overflow-hidden bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:shadow-xl transition-all"
                        >
                          <div className="h-48 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                            {proj.image ? (
                              <img
                                src={proj.image}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                alt="project"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-400">
                                <ImageIcon size={32} />
                              </div>
                            )}

                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              {proj.link && (
                                <a
                                  href={proj.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-4 py-2 bg-white rounded-full font-bold text-xs uppercase tracking-wider hover:bg-teal-50"
                                >
                                  View Project
                                </a>
                              )}
                            </div>
                          </div>

                          <div className="p-6">
                            {isEditing ? (
                              <div className="space-y-3">
                                <input
                                  value={proj.image || ''}
                                  onChange={(e) => updateList('projects', proj.id, 'image', e.target.value)}
                                  placeholder="Image URL"
                                  className="w-full text-xs bg-white dark:bg-[#0a0a0a] p-2 rounded border"
                                />
                                <input
                                  value={proj.title || ''}
                                  onChange={(e) => updateList('projects', proj.id, 'title', e.target.value)}
                                  className="w-full font-bold bg-white dark:bg-[#0a0a0a] p-2 rounded border"
                                  placeholder="Project title"
                                />
                                <input
                                  value={proj.category || ''}
                                  onChange={(e) =>
                                    updateList('projects', proj.id, 'category', e.target.value)
                                  }
                                  className="w-full text-xs bg-white dark:bg-[#0a0a0a] p-2 rounded border"
                                  placeholder="Category"
                                />
                                <input
                                  value={proj.link || ''}
                                  onChange={(e) => updateList('projects', proj.id, 'link', e.target.value)}
                                  placeholder="Link URL"
                                  className="w-full text-xs bg-white dark:bg-[#0a0a0a] p-2 rounded border"
                                />
                                <textarea
                                  value={proj.desc || ''}
                                  onChange={(e) => updateList('projects', proj.id, 'desc', e.target.value)}
                                  className="w-full text-xs bg-white dark:bg-[#0a0a0a] p-2 rounded border h-20"
                                  placeholder="Description"
                                />
                                <button
                                  onClick={() => removeFromList('projects', proj.id)}
                                  className="text-red-500 text-xs font-bold w-full text-center"
                                >
                                  Delete Project
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">
                                  {proj.category}
                                </div>
                                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">
                                  {proj.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                                  {proj.desc}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'contact' && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <h2 className={`${THEME.heading} text-2xl mb-6`}>Get in Touch</h2>

                    <div className="w-full h-64 bg-slate-100 rounded-3xl overflow-hidden mb-8 shadow-inner border border-gray-200">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(
                          profile.location || 'New Delhi'
                        )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        className="opacity-90 hover:opacity-100 transition-opacity"
                        title="location-map"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      {[
                        { label: 'Address', key: 'address', val: profile.address || '' },
                        { label: 'Email', key: 'email', val: profile.email || '' },
                        { label: 'Phone', key: 'phone', val: profile.phone || '' },
                        { label: 'Freelance', key: 'workStatus', val: profile.workStatus || 'Available' },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4"
                        >
                          <span className="inline-block px-3 py-1 rounded text-xs font-bold uppercase text-white bg-teal-600 mb-2 md:mb-0 w-fit shadow-md shadow-teal-500/20">
                            {item.label} .....
                          </span>

                          {isEditing ? (
                            item.key === 'workStatus' ? (
                              <select
                                value={item.val}
                                onChange={(e) => setProfile({ ...profile, workStatus: e.target.value })}
                                className="text-right bg-transparent outline-none border-b border-dashed border-gray-300 w-full md:w-1/2 p-1"
                              >
                                <option value="Available">Available</option>
                                <option value="Busy">Busy</option>
                              </select>
                            ) : (
                              <input
                                value={item.val}
                                onChange={(e) => setProfile({ ...profile, [item.key]: e.target.value })}
                                className="text-right bg-transparent outline-none border-b border-dashed border-gray-300 w-full md:w-1/2 p-1"
                              />
                            )
                          ) : (
                            <span className="text-right font-bold text-gray-700 dark:text-gray-300">
                              {item.val || '-'}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5 text-center">
                      <div className="inline-block p-4 rounded-full bg-white dark:bg-[#0a0a0a] shadow-lg mb-4 text-teal-600">
                        <Coffee size={32} />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                        Let&apos;s Connect
                      </h3>
                      <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                        Have a project in mind or just want to chat? Add your Google Form link below.
                      </p>

                      {isEditing ? (
                        <input
                          value={profile.googleFormUrl}
                          onChange={(e) => setProfile({ ...profile, googleFormUrl: e.target.value })}
                          placeholder="Paste Google Form URL..."
                          className="w-full max-w-md mx-auto p-3 rounded-xl border border-gray-300 text-center text-sm"
                        />
                      ) : (
                        <a
                          href={profile.googleFormUrl || '#'}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-xl transition-transform ${
                            profile.googleFormUrl
                              ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-500/20 hover:-translate-y-1'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Start Conversation <ExternalLink size={16} />
                        </a>
                      )}
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { icon: Mail, label: 'Email', value: profile.email || 'Not added yet' },
                        { icon: Phone, label: 'Phone', value: profile.phone || 'Not added yet' },
                        { icon: MapPin, label: 'Location', value: profile.location || 'Not added yet' },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border dark:border-white/10"
                        >
                          <div className="p-3 bg-teal-500 text-white rounded-xl">
                            <item.icon size={20} />
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] opacity-50 font-bold tracking-widest uppercase">
                              {item.label}
                            </p>
                            <p className="font-bold text-sm">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-[110]">
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className={`flex items-center gap-3 px-8 py-4 rounded-full font-black shadow-2xl transition-all hover:scale-105 ${THEME.button}`}
        >
          {saving ? (
            <Loader2 className="animate-spin" size={20} />
          ) : isEditing ? (
            <Save size={20} />
          ) : (
            <Edit2 size={20} />
          )}
          <span>{isEditing ? 'SAVE PROFILE' : 'EDIT PROFILE'}</span>
        </button>
      </div>

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-slate-900 text-white shadow-2xl flex items-center gap-3 z-[120]"
          >
            {notification.type === 'success' ? (
              <CheckCircle size={18} className="text-teal-400" />
            ) : (
              <AlertCircle size={18} className="text-red-400" />
            )}
            <span className="font-bold text-sm">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileEditor;