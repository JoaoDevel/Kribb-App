import { useSignIn } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function SignIn() {

    const { signIn, errors, fetchStatus } = useSignIn()


    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [code, setCode] = useState("")

    const isLoading = fetchStatus === "fetching"


    // Sign in with password
    const onSignInPress = async () => {
        const { error } = await signIn.password({
            emailAddress: email,
            password,

        })

        // Show error message
        if (error) {
            alert(error.message)
            return
        }

        // If sign in is complete, navigate to home screen
        if (signIn.status === "complete") {
            await signIn.finalize({
                navigate: ({ session, decorateUrl }) => {
                    if (session?.currentTask) {
                        console.log(session?.currentTask)
                        return
                    }
                    const url = decorateUrl("/")
                    router.replace(url as any)
                }
            })
        } else if (signIn.status === "needs_second_factor") {
            await signIn.mfa.sendPhoneCode()
        } else if (signIn.status === "needs_client_trust") {
            const emailCodeFactor = signIn.supportedSecondFactors.find((factor) => factor.strategy === "email_code",)

            if (emailCodeFactor) await signIn.mfa.sendEmailCode()
        } else {
            console.error("Sign in attempt nor complete", signIn)
        }


        // Send email code for my email address
        // if (!error) await signIn.verifications.sendEmailCode()
    }

    // // Verify account with email code
    const onVerifyPress = async () => {
        await signIn.mfa.verifyEmailCode({
            code,
        })

        if (signIn.status === "complete") {
            await signIn.finalize({
                navigate: ({ session, decorateUrl }) => {
                    if (session?.currentTask) {
                        console.log(session?.currentTask)
                        return
                    }
                    const url = decorateUrl("/")
                    router.replace(url as any)
                }
            })
        }
    }

    // // Show email verification screen
    if (signIn.status === "needs_client_trust") {
        return (
            <View className="flex-1  justify-center px-6 py-12">
                <Image source={require("../../assets/images/kribb.png")} className="w-32 h-16 mb-8" resizeMode="contain" />
                <Text className="text-3xl font-bold text-gray-800 mb-2">Verify your account</Text>
                <Text className="text-gray-500 mb-8">We sent a code to {email} </Text>

                {/* Verification code */}
                <TextInput
                    placeholder="Enter verification code"
                    className="w-full rounded-md border border-gray-300 p-2 mb-4"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="number-pad"
                    value={code}
                    onChangeText={setCode}
                />
                {/* Error message */}
                {errors.fields.code && (
                    <Text className="text-red-500 mb-4">
                        {errors.fields.code.message}
                    </Text>
                )}

                {/* Button */}
                <TouchableOpacity onPress={onVerifyPress} disabled={isLoading} className="w-full bg-blue-600 rounded-md items-center py-3 mb-4">
                    {isLoading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white text-sm font-bold text-base">Verify Account</Text>
                    )}
                </TouchableOpacity>

                {/* Resend code */}
                <TouchableOpacity onPress={() => signIn.mfa.sendEmailCode()} className="py-2">
                    <Text className="text-blue-600">I need a new code</Text>
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white" keyboardShouldPersistTaps="handled">
            <View className="flex-1  justify-center px-6 py-12">
                <Image source={require("../../assets/images/kribb.png")} className="w-32 h-16 mb-8" resizeMode="contain" />
                <Text className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</Text>
                <Text className="text-gray-500 mb-8">Sign in to your account</Text>


                {/* Email */}
                <TextInput
                    className="w-full rounded-md border border-gray-300 p-2 mb-4"
                    placeholder="Email address"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {/* Error message */}
                {errors.fields.identifier && (
                    <Text className="text-red-500 text-sm mb-4">{errors.fields.identifier.message}</Text>
                )}

                {/* Password */}
                <TextInput
                    className="w-full rounded-md border border-gray-300 p-2 mb-4"
                    placeholder="Password"
                    placeholderTextColor="#9CA3AF"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                {/* Error message */}
                {errors.fields.password && (
                    <Text className="text-red-500 text-sm mb-4">{errors.fields.password.message}</Text>
                )}

                {/* Button */}
                <TouchableOpacity onPress={onSignInPress} disabled={isLoading} className="w-full bg-blue-600 rounded-md items-center py-3 mb-4">
                    {isLoading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white text-sm font-bold text-base">Sign In</Text>
                    )}
                </TouchableOpacity>
                {/* Sign In Link */}
                <View className="flex-row justify-center">
                    <Text className="text-gray-500">Don't have an account? </Text>
                    <Link href="/sign-up">
                        <Text className="text-blue-600 font-semibold">Sign Up</Text>
                    </Link>
                </View>

                <View nativeID="clerk-captcha" />

            </View>
        </ScrollView>

    )
} 