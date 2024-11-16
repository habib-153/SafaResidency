import { useTranslation } from "react-i18next";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <footer className="bg-[#4F2E1D] p-10 bg-base-200  text-base-content">
        <div className="container mx-auto grid sm:grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4  items-center text-white text-base  footer">
          <aside>
            {/* <img className="my-3 size-16" src={logo} alt="" /> */}
            <p>
              {t("home.Footer.address")} <br />
              <br />
            </p>
          </aside>
          <div className="flex flex-col gap-2">
            <a href="mailto:info@safaresidency.com">
              {t("home.Footer.support")}
            </a>
            <br />
            {t("home.Footer.availability")}
            <br />
            <a href="tel:+8801831-335222">{t("home.Footer.phone")}</a>
          </div>
          <nav className="flex flex-col gap-2">
            <a href="/" className="link link-hover">
              {t("home.Footer.home")}
            </a>
            <a href="/contact" className="link link-hover">
              {t("home.Footer.aboutUs")}{" "}
            </a>
            <a href="/terms" className="link link-hover">
              {t("home.Footer.termsAndConditions")}{" "}
            </a>
          </nav>

          <nav className="flex flex-col gap-2">
            <p>{t("home.Footer.followUs")}</p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/hotel.safa.residency/">
                <BsInstagram className="text-gold h-6 w-6" />
              </a>

              <a href="https://www.facebook.com/profile.php?id=61567457130853">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current text-gold"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
            <p>{t("home.Footer.copyright")}</p>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Footer;
