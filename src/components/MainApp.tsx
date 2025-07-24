@@ .. @@
 import React, { useState } from 'react';
+import { useNavigate } from 'react-router-dom';
 import { useCategories, useProducts } from '../hooks/useApi';
@@ .. @@
 function MainApp() {
   const [currentView, setCurrentView] = useState<ViewType>('products');
   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
+  const navigate = useNavigate();
   
   const { categories, loading: categoriesLoading } = useCategories();
@@ .. @@
     setCurrentView('products');
   };
 
+  const handleAdminToggle = () => {
+    navigate('/admin');
+  };
+
   const handleViewCart = () => {
@@ .. @@
       <Header 
         currentView={currentView} 
         onViewChange={handleViewChange}
-        onAdminToggle={() => setIsAdminMode(!isAdminMode)}
+        onAdminToggle={handleAdminToggle}
       />