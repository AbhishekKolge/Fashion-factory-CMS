import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectionTimeout = setTimeout(() => {
      router.push({
        pathname: "/",
      });
    }, 2000);
    return () => clearTimeout(redirectionTimeout);
  }, []);

  return (
    <section className="px-1 py-5 py-md-5 h-100 d-flex justify-content-center align-items-center">
      <div className="container d-flex flex-column align-items-center gap-5">
        <div>
          <Image
            priority={true}
            alt="not-found"
            src="/not-found.png"
            width={300}
            height={300}
          />
        </div>
        <h1 className="display-6 text-center">
          Page not found. Redirecting to home page...
        </h1>
      </div>
    </section>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      open: true,
      hideSidebar: true,
    },
  };
}

export default NotFoundPage;
