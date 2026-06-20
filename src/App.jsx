import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './i18n.js';
import './index.css';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

// Lazy-loaded pages for performance
const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail.jsx'));
const Doctors = lazy(() => import('./pages/Doctors.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const BlogDetail = lazy(() => import('./pages/BlogDetail.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const BookAppointment = lazy(() => import('./pages/BookAppointment.jsx'));
const Procedures = lazy(() => import('./pages/Procedures.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const TermsOfService = lazy(() => import('./pages/TermsOfService.jsx'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout.jsx'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'));
const BlogManager = lazy(() => import('./pages/admin/BlogManager.jsx'));
const DoctorManager = lazy(() => import('./pages/admin/DoctorManager.jsx'));
const ServiceManager = lazy(() => import('./pages/admin/ServiceManager.jsx'));
const AppointmentManager = lazy(() => import('./pages/admin/AppointmentManager.jsx'));
const ContactManager = lazy(() => import('./pages/admin/ContactManager.jsx'));
const GalleryManager = lazy(() => import('./pages/admin/GalleryManager.jsx'));
const PhotoSettings = lazy(() => import('./pages/admin/PhotoSettings.jsx'));

// Loading spinner
const PageLoader = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--primary-bg)',
    flexDirection: 'column',
    gap: '16px',
  }}>
    <div style={{
      width: '48px', height: '48px',
      border: '4px solid var(--primary-light)',
      borderTop: '4px solid var(--primary)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading...</span>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// Public layout wrapper
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
    <WhatsAppFloat />
    <InstagramFloat />
  </>
);

// WhatsApp float button inline
const WhatsAppFloat = () => (
  <a href="https://wa.me/9183570761" target="_blank" rel="noreferrer"
    aria-label="Chat on WhatsApp"
    style={{
      position: 'fixed', bottom: '28px', right: '28px',
      width: '60px', height: '60px',
      background: '#25D366',
      borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 8px 24px rgba(37,211,102,0.45)',
      zIndex: 9999,
      transition: 'all 0.3s ease',
      animation: 'pulseWA 2.5s infinite',
      textDecoration: 'none',
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
  >
    <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    <style>{`@keyframes pulseWA { 0%,100%{box-shadow:0 8px 24px rgba(37,211,102,.45)} 50%{box-shadow:0 8px 40px rgba(37,211,102,.7)} }`}</style>
  </a>
);

// Instagram float button
const InstagramFloat = () => (
  <a href="https://www.instagram.com/dr.mohit_urowala" target="_blank" rel="noreferrer"
    aria-label="Follow on Instagram"
    style={{
      position: 'fixed', bottom: '100px', right: '28px',
      width: '60px', height: '60px',
      background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
      borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 8px 24px rgba(220,39,67,0.4)',
      zIndex: 9999,
      transition: 'all 0.3s ease',
      animation: 'pulseIG 2.8s infinite',
      textDecoration: 'none',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.12)'; e.currentTarget.title = 'Follow on Instagram'; }}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
  >
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
    <style>{`@keyframes pulseIG { 0%,100%{box-shadow:0 8px 24px rgba(220,39,67,.4)} 50%{box-shadow:0 8px 40px rgba(220,39,67,.7)} }`}</style>
  </a>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          } />
          <Route path="/about" element={
            <PublicLayout><About /></PublicLayout>
          } />
          <Route path="/services" element={
            <PublicLayout><Services /></PublicLayout>
          } />
          <Route path="/services/:slug" element={
            <PublicLayout><ServiceDetail /></PublicLayout>
          } />
          <Route path="/doctors" element={
            <PublicLayout><Doctors /></PublicLayout>
          } />
          <Route path="/gallery" element={
            <PublicLayout><Gallery /></PublicLayout>
          } />
          {/* Blog - controlled by admin Blog Manager toggle */}
          <Route path="/blog" element={
            <PublicLayout><Blog /></PublicLayout>
          } />
          <Route path="/blog/:slug" element={
            <PublicLayout><BlogDetail /></PublicLayout>
          } />
          <Route path="/contact" element={
            <PublicLayout><Contact /></PublicLayout>
          } />
          <Route path="/book-appointment" element={
            <PublicLayout><BookAppointment /></PublicLayout>
          } />
          <Route path="/procedures" element={
            <PublicLayout><Procedures /></PublicLayout>
          } />
          <Route path="/privacy" element={
            <PublicLayout><PrivacyPolicy /></PublicLayout>
          } />
          <Route path="/terms" element={
            <PublicLayout><TermsOfService /></PublicLayout>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="blogs" element={<BlogManager />} />
            <Route path="doctors" element={<DoctorManager />} />
            <Route path="services" element={<ServiceManager />} />
            <Route path="appointments" element={<AppointmentManager />} />
            <Route path="contacts" element={<ContactManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="photo-settings" element={<PhotoSettings />} />
          </Route>

          {/* 404 - redirect home */}
          <Route path="*" element={
            <PublicLayout>
              <div style={{minHeight:'60vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'24px',padding:'120px 24px 60px'}}>
                <h1 style={{fontFamily:'Rethink Sans',fontSize:'6rem',color:'var(--primary)',lineHeight:1}}>404</h1>
                <h2>Page Not Found</h2>
                <p style={{color:'var(--text-muted)'}}>The page you're looking for doesn't exist.</p>
                <a href="/" className="btn btn-primary">Back to Home</a>
              </div>
            </PublicLayout>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

