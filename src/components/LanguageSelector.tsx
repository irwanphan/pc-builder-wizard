import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="px-2 py-1 border rounded-md text-sm"
    >
      <option value="en">English</option>
      <option value="id">Indonesia</option>
    </select>
  );
}