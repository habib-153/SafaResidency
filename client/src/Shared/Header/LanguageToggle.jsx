import { Select } from "antd";
import { IoLanguageOutline } from "react-icons/io5";
import { GB } from "country-flag-icons/react/3x2";
import { BD } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  const handleChange = (value) => {
    i18n?.changeLanguage(value);
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "bn" : "en";
    i18n.changeLanguage(newLanguage);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 p-2 border rounded-md"
        >
          {i18n.language === "en" ? (
            <>
            <GB className="h-4 w-4" />
            <span>English</span>
          </>
          ) : (
            <>
              <BD className="h-4 w-4" />
              <span>বাংলা</span>
            </>
          )}
        </button>
      ) : (
        <Select
          defaultValue={i18n?.language || "en"}
          onChange={handleChange}
          style={{ width: 120, zIndex: 1000 }}
          suffixIcon={<IoLanguageOutline className="text-gold" />}
          options={[
            {
              value: "en",
              label: (
                <div style={{ zIndex: 1000 }} className="flex items-center gap-2">
                  <GB className="h-4 w-4" />
                  <span>English</span>
                </div>
              ),
            },
            {
              value: "bn",
              label: (
                <div style={{ zIndex: 1000 }} className="flex items-center gap-2">
                  <BD className="h-4 w-4" />
                  <span>বাংলা</span>
                </div>
              ),
            },
          ]}
        />
      )}
    </>
  );
};

export default LanguageToggle;