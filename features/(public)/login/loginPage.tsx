"use client";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import Logo from "@/shared/components/logoSVG";
import { Hospital, HeartCrack, Heart, ArrowRight } from "lucide-react";
const LoginPage = () => {
    const methods = useForm<{ email: string, password: string }>({
        defaultValues: { email: "", password: "" },
    });
    const { register, reset, formState } = methods;
    const error = formState.errors;
    const loginFormSubmit = () => {

    }
    return (
        <FormProvider {...methods}>
            <main className="w-full h-screen flex justify-center items-center bg-background">
                <section className="w-1/2 bg-background h-full hidden md:flex flex-col justify-center items-center gap-4">
                    <div className="group relative w-full h-full flex flex-col justify-center items-center">
                        <Image src={"/login_background.jpg"} alt="login_background" width={1080} height={1080} className="z-0 absolute" />
                        <Image
                            className="z-20 ml-30 rounded-b-full"
                            width={1080} height={1080} src="/login_background_doctor.webp" alt="doctor" loading="lazy" />
                        <div className="z-10 inset absolute w-3/4 aspect-square rounded-full border-10 border-background backdrop-blur-xs"></div>
                    </div>
                </section>
                <section className="w-full md:w-1/2 h-full flex flex-col justify-center items-center gap-10">
                    <div className="w-35 h-20">
                        <Logo />
                    </div>
                    <p className="px-4 text-center md:w-1/2 flex justify-center items-center text-foreground text-2xl font-mono font-black">
                        Caring for Your Health, When It Matters Most
                    </p>
                    <form className="w-full flex flex-col justify-center items-center gap-4" onSubmit={methods.handleSubmit(loginFormSubmit)}>
                        <div className="w-full lg:w-2/3 flex flex-col gap-2 px-20">
                            <Label>Email OR UseName</Label>
                            <Input
                                className={cn("border border-foreground p-2 rounded-md w-full",
                                    error.email && "border-destructive"
                                )}
                                placeholder="Email"
                                type="text"
                                {...register("email", {
                                    pattern: { value: /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9_]+)$/, message: "Enter Valid Email or Username" },
                                    required: { value: true, message: "Enter Email or Usename" }
                                })}
                            />
                            {
                                error.email && <Label className="text-destructive">{error.email.message}</Label>
                            }
                        </div>
                        <div className="w-full lg:w-2/3 flex flex-col gap-2 px-20">
                            <Label>Password</Label>
                            <Input
                                className={cn("border border-foreground p-2 rounded-md w-full",
                                    error.password && "border-destructive"
                                )}
                                placeholder="Password"
                                type="password"
                                {...register("password", {
                                    required: { value: true, message: "Enter Password" }
                                })}
                            />
                            {
                                error.password && <Label className="text-destructive">{error.password.message}</Label>
                            }
                            <Button variant={"ghost"} className={"w-full h-4 flex justify-end p-0 cursor-pointer hover:bg-transparent hover:text-foreground/90"}>Forgot Password</Button>
                        </div>
                        <div className="w-full lg:w-2/3 flex flex-col gap-2 px-20">
                            <Button type="submit" className="rounded-md bg-accent hover:bg-accent/90 cursor-pointer">
                                Login
                            </Button>
                        </div>
                    </form>
                    <div className="w-full group relative flex flex-col justify-center items-center">
                        <div className="w-1/5 inset fixed h-px bg-black"></div>
                        <Button className={"inset absolute bg-background text-foreground flex justify-center cursor-pointer hover:bg-background hover:text-accent/90"}>Register</Button>

                    </div>
                    <div className="flex justify-center items-center w-1/2 gap-2 text-foreground">
                        <HeartCrack className="w-1/5 h-10" />
                        <ArrowRight />
                        <Hospital className="w-1/5 h-10" />
                        <ArrowRight />
                        <Heart className="w-1/5 h-10" />
                    </div>
                </section>
            </main>
        </FormProvider>
    )
}

export { LoginPage }