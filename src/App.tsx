import React, { useState, useEffect } from 'react';
import { WizardProvider } from './context/WizardContext';
import { Wizard } from './components/Wizard';
import { Cpu, LampDesk as Desktop, Monitor } from 'lucide-react';
import ProductList from './components/admin/ProductList';
import { useTranslation } from 'react-i18next';
import { supabase } from './lib/supabaseClient';
import AuthModal from './components/auth/AuthModal';
import LanguageSelector from './components/LanguageSelector';
import { User } from '@supabase/supabase-js';

function App() {
  const { t } = useTranslation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check if user is admin (you should implement your own admin check logic)
  useEffect(() => {
    if (user) {
      // Example: check if user email is in admin list
      const isUserAdmin = user.email?.endsWith('@admin.com') ?? false;
      setIsAdmin(isUserAdmin);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">{t('common.pcBuilder')}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  {t('common.logout')}
                </button>
                {isAdmin && (
                  <button
                    onClick={() => setIsAdmin(!isAdmin)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                  >
                    {isAdmin ? t('common.exitAdmin') : t('common.adminPanel')}
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                {t('common.login')}
              </button>
            )}
          </div>
        </div>
      </header>
      
      {isAdmin && user ? (
        <ProductList />
      ) : (
        <main className="max-w-6xl mx-auto px-4 py-8">
          {!user ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {t('common.login')} / {t('common.register')}
              </h2>
              <p className="text-gray-600 mb-6">
                Please log in or register to start building your PC
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('common.login')}
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  {t('common.buildYourPc')}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {t('common.buildDescription')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Desktop className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t('common.customRecommendations')}
                  </h3>
                  <p className="text-gray-600">
                    {t('common.customRecommendationsDesc')}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Monitor className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t('common.optimizePerformance')}
                  </h3>
                  <p className="text-gray-600">
                    {t('common.optimizePerformanceDesc')}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Cpu className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t('common.customizableBuild')}
                  </h3>
                  <p className="text-gray-600">
                    {t('common.customizableBuildDesc')}
                  </p>
                </div>
              </div>
              
              <WizardProvider>
                <Wizard />
              </WizardProvider>
            </>
          )}
        </main>
      )}
      
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            {t('common.copyright')}
          </p>
        </div>
      </footer>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}

export default App;