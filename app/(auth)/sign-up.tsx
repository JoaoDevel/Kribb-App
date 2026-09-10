import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function SignUp() {

    const { signUp, errors, fetchStatus } = useSignUp()

    const { isSignedIn } = useAuth()

    const router = useRouter()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [code, setCode] = useState("")

    const isLoading = fetchStatus === "fetching"

    // If user is signed in or sign up is complete, redirect to home screen
    if (signUp.status === "complete" || isSignedIn) {
        return null
    }

    // Sign up with password
    const onSignUpPress = async () => {
        const { error } = await signUp.password({
            emailAddress: email,
            password,
            firstName,
            lastName,
        })

        // Show error message
        if (error) {
            alert(error.message)
            return
        }

        // Send email code for my email address
        if (!error) await signUp.verifications.sendEmailCode()
    }

    // Verify account with email code
    const onVerifyPress = async () => {
        await signUp.verifications.verifyEmailCode({
            code,
        })

        if (signUp.status === "complete") {
            await signUp.finalize({
                navigate: ({ decorateUrl }) => {
                    const url = decorateUrl("/")
                    router.replace(url as any)
                }
            })
        }
    }

    // Show email verification screen
    if (
        signUp.status === "missing_requirements" &&
        signUp.unverifiedFields.includes("email_address") &&
        signUp.missingFields.length === 0
    ) {
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
                <TouchableOpacity onPress={() => signUp.verifications.sendEmailCode()} className="py-2">
                    <Text className="text-blue-600">I need a new code</Text>
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white" keyboardShouldPersistTaps="handled">
            <View className="flex-1  justify-center px-6 py-12">
                <Image source={require("../../assets/images/kribb.png")} className="w-32 h-16 mb-8" resizeMode="contain" />
                <Text className="text-3xl font-bold text-gray-800 mb-2">Create account</Text>
                <Text className="text-gray-500 mb-8">Find your dream home today</Text>

                {/* Inputs */}
                <View className="flex-row gap-2 mb-4">
                    {/* First Name */}
                    <TextInput
                        placeholder="First Name"
                        className="flex-1 rounded-md border border-gray-300 p-2"
                        placeholderTextColor="#9CA3AF"
                        autoCapitalize="words"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    {/* Last Name */}
                    <TextInput
                        placeholder="Last Name"
                        className="flex-1 rounded-md border border-gray-300 p-2"
                        placeholderTextColor="#9CA3AF"
                        autoCapitalize="words"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </View>

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
                {errors.fields.emailAddress && (
                    <Text className="text-red-500 text-sm mb-4">{errors.fields.emailAddress.message}</Text>
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
                <TouchableOpacity onPress={onSignUpPress} disabled={isLoading} className="w-full bg-blue-600 rounded-md items-center py-3 mb-4">
                    {isLoading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white text-sm font-bold text-base">Sign Up</Text>
                    )}
                </TouchableOpacity>
                {/* Sign In Link */}
                <View className="flex-row justify-center">
                    <Text className="text-gray-500">Already have an account? </Text>
                    <Link href="/sign-in">
                        <Text className="text-blue-600 font-semibold">Sign In</Text>
                    </Link>
                </View>

                <View nativeID="clerk-captcha" />

            </View>
        </ScrollView>

    )
} 