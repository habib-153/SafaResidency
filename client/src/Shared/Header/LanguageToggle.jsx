import { Select } from "antd";
import { IoLanguageOutline } from "react-icons/io5";
import { GB } from "country-flag-icons/react/3x2";
import { BD } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const handleChange = (value) => {
    i18n?.changeLanguage(value);
  };

  return (
    <Select
      defaultValue={i18n?.language || "en"}
      onChange={handleChange}
      style={{ width: 120 }}
      suffixIcon={<IoLanguageOutline className="text-gold" />}
      options={[
        {
          value: "en",
          label: (
            <div className="flex items-center gap-2">
              <GB className="h-4 w-4" />
              <span>English</span>
            </div>
          ),
        },
        {
          value: "bn",
          label: (
            <div className="flex items-center gap-2">
              <BD className="h-4 w-4" />
              <span>বাংলা</span>
            </div>
          ),
        },
      ]}
    />
  );
};

export default LanguageToggle;
