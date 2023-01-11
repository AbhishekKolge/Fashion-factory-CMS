import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

import Spinner from "../../components/UI/Spinner/Spinner";

import { useVerifyMutation } from "../../store/slices/api/authApiSlice";

const VerifyPage = () => {
  const router = useRouter();

  const { token, email } = router.query;

  const [
    verify,
    { isSuccess: verifySuccess, isError: verifyIsError, error: verifyError },
  ] = useVerifyMutation();

  useEffect(() => {
    if (email && token) {
      (async () => {
        await verify({ email, token });
      })();
    } else {
      router.push({
        pathname: "/auth/login",
      });
    }
  }, [token, email]);

  useEffect(() => {
    if (verifyIsError) {
      if (verifyError.data?.msg) {
        toast.error(verifyError.data.msg.split(",")[0]);
        router.push({
          pathname: "/auth/login",
        });
      } else {
        toast.error("Verification failed");
        router.push({
          pathname: "/auth/login",
        });
      }
    }
    if (verifySuccess) {
      toast.success("Verification successful");
      router.push({
        pathname: "/auth/login",
      });
    }
  }, [verifySuccess, verifyIsError, verifyError]);

  return (
    <section className="px-1 py-5 py-md-5 bg-primary bg-opacity-10 h-100">
      <div className="container d-flex justify-content-center flex-column text-center h-100 gap-2">
        <Spinner />
        <h4>Verifying Your Email...!!!</h4>
        <p>Sit back and relax, we are verifying your email address</p>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      loggedInProtected: true,
    },
  };
}

export default VerifyPage;
