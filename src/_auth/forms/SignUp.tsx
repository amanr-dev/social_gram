import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

// SignUp function
const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Queries
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } =
    useSignInAccount();

  // Form submit Handler
  const handleSignup = async (user: z.infer<typeof SignUpValidation>) => {
    try {
      const newUser = await createUserAccount(user);

      if (!newUser) {
        toast({ title: "Sign up failed. Please try again." });

        return;
      }

      // Sign in the user
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({ title: "Something went wrong. Please login your new account" });

        navigate("/sign-in");

        return;
      }

      // Are you loggedIn or not?
      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again." });

        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <Form {...form}>
        <div className="sm:w-[450px] flex-center flex-col bg-[#00000080] w-[500px]  py-4 px-9">
          <div className="flex flex-1 items-center justify-center flex-col w-full pt-2">
            <img
              src="/assets/images/socialgram1.png"
              className="w-[200px]"
              alt="Social Gram"
            />
            <h2 className="h3-bold md:h2-bold pt-6 md:pt-2">
              Create an account
            </h2>
            <p className="text-light-2 small-medium md:base-regular mt-4 ">
              Please enter your details to join SocialGram
            </p>
          </div>
          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="flex flex-col gap-4 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                      className="shad-input"
                    />
                  </FormControl>

                  <FormMessage className="text-rose-500 tiny-medium " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      className="shad-input"
                    />
                  </FormControl>

                  <FormMessage className="text-rose-500 tiny-medium" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                      className="shad-input"
                    />
                  </FormControl>

                  <FormMessage className="text-rose-500 tiny-medium" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      {...field}
                      type="password"
                      className="shad-input"
                    />
                  </FormControl>

                  <FormMessage className="text-rose-500 tiny-medium" />
                </FormItem>
              )}
            />
            <Button type="submit" className="shad-button_primary">
              {isCreatingAccount || isUserLoading || isSigningInUser ? (
                <Loader showTxt={false} simple />
              ) : (
                "Sign up"
              )}
            </Button>
            <p className="text-small-regular text-light-2 text-center">
              Already have an account?
              <Link
                to="/sign-in"
                className="text-primary-500 text-small-semibold ml-1"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </>
  );
};

export default SignUp;
