/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/auth/authSlice";
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "../../redux/features/blog/blogApi";
import Loading from "../ui/Loading";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Modal, Dropdown, Menu } from "antd";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import UpdateBlogModal from "../ui/Modals/UpdateBlogModal";

export default function Blog() {
  const { data, isLoading } = useGetAllBlogsQuery();
  const user = useSelector(currentUser);
  const blogs = data?.data;
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [blogToUpdate, setBlogToUpdate] = useState(null);
  const [deleteBlog] = useDeleteBlogMutation();
  const { t } = useTranslation();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  if (isLoading) return <Loading />;

  const truncateDescription = (description, wordCount = 25) => {
    // Remove HTML tags and get plain text
    const plainText = description.replace(/<[^>]*>/g, "");
    const words = plainText.split(" ");
    if (words.length > wordCount) {
      return words.slice(0, wordCount).join(" ") + "...";
    }
    return plainText;
  };

  const generateMetaDescription = () => {
    if (!blogs?.length) return "Explore our latest blog posts and articles";
    return blogs[0].description.replace(/<[^>]*>/g, "").slice(0, 160);
  };

  const generateKeywords = () => {
    if (!blogs?.length) return "blog, articles, news";
    const categories = [...new Set(blogs.flatMap((blog) => blog.category))];
    return categories.join(", ");
  };

  const handleDelete = async (blogId) => {
    const toastId = toast.loading("Please wait...");
    const res = await deleteBlog(blogId);
    //console.log(res);
    if (res?.error) {
      toast.error("something went wrong", { id: toastId, duration: 3000 });
    } else {
      toast.success("Blog Deleted successfully", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  const AdminMenu = ({ blog }) => (
    <Menu>
      <Menu.Item
        key="delete"
        icon={<FiTrash2 className="text-red-500" />}
        onClick={() => handleDelete(blog._id)}
      >
        Delete Blog
      </Menu.Item>
      <Menu.Item
        key="update"
        icon={<FiEdit className="text-blue-500" />}
        onClick={() => {
          setBlogToUpdate(blog);
          setIsUpdateModalOpen(true);
        }}
      >
        Update Blog
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Helmet>
        <title>{`Our City | Safa Residency`}</title>
        <meta name="description" content={generateMetaDescription()} />
        <meta name="keywords" content={generateKeywords()} />
        <meta
          property="og:title"
          content={
            blogs?.length > 0 ? blogs[0].title : " Our City | Safa Residency"
          }
        />
        <meta property="og:description" content={generateMetaDescription()} />
      </Helmet>

      <div className="container mx-auto px-2 py-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-center mb-8"
        >
          {t("ourCity.title")}
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogs?.map((blog) => (
            <motion.div
              key={blog._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="h-full group"
            >
              <Card
                className="h-full cursor-pointer hover:-translate-y-1 transition-transform duration-300"
                onClick={() => {
                  setSelectedBlog(blog);
                  setIsModalOpen(true);
                }}
              >
                <CardHeader className="relative h-56 overflow-hidden">
                  <img
                    src={blog.images[0]}
                    alt={blog.title}
                    className="h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  {user?.role === "admin" && (
                    <div
                      className="absolute top-4 right-4 z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Dropdown
                        overlay={<AdminMenu blog={blog} />}
                        trigger={["click"]}
                        placement="bottomRight"
                      >
                        <IconButton
                          variant="text"
                          className="bg-white/90 hover:bg-white"
                        >
                          <HiOutlineDotsVertical className="h-6 w-6" />
                        </IconButton>
                      </Dropdown>
                    </div>
                  )}
                </CardHeader>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4 items-center">
                    {blog.category
                      .slice(0, showAllCategories ? blog.category.length : 3)
                      .map((cat, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {cat}
                        </span>
                      ))}
                    {blog.category.length > 3 && !showAllCategories && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowAllCategories(true);
                        }}
                        className="px-3 py-1 text-sm text-gold hover:underline"
                      >
                        +{blog.category.length - 3} more
                      </button>
                    )}
                    {showAllCategories && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowAllCategories(false);
                        }}
                        className="px-3 py-1 text-sm text-gold hover:underline"
                      >
                        Show less
                      </button>
                    )}
                  </div>
                  <Typography
                    variant="h5"
                    className="mb-3 group-hover:text-gold transition-colors"
                  >
                    {blog.title}
                  </Typography>
                  <Typography color="gray" className="mb-4 line-clamp-3">
                    {truncateDescription(blog.description)}
                    <span className="text-gold ml-1 hover:underline">
                      Read more
                    </span>
                  </Typography>
                  <Typography className="text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {isModalOpen && selectedBlog && (
            <Modal
              title={null}
              footer={null}
              open={isModalOpen}
              onCancel={() => {
                setIsModalOpen(false);
                setSelectedBlog(null);
              }}
              width={1200}
              className="blog-modal overflow-hidden"
              centered
              styles={{
                body: {
                  overflowY: "auto",
                  maxHeight: "95vh",
                },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-4"
              >
                <div className="relative h-[500px] mb-6 rounded-xl overflow-hidden">
                  <img
                    src={selectedBlog.images[0]}
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedBlog.category.map((cat, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <Typography
                    variant="h3"
                    style={{ fontFamily: "Bebas Neue" }}
                    className="mb-3"
                  >
                    O{selectedBlog.title}
                  </Typography>
                  <Typography className="text-sm text-gray-500 mb-6">
                    Published on{" "}
                    {new Date(selectedBlog.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </Typography>
                  <div
                    className="prose max-w-none mb-5"
                    dangerouslySetInnerHTML={{
                      __html: selectedBlog.description,
                    }}
                  />
                </motion.div>
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>
      </div>
      {isUpdateModalOpen && (
        <UpdateBlogModal
          blog={blogToUpdate}
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setBlogToUpdate(null);
          }}
        />
      )}
    </>
  );
}
