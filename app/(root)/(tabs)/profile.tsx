import { useAuth } from "@clerk/expo";
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {

    const { signOut } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
            router.replace("/sign-in")
        } catch (error) {
            console.error("Error signing out", error)
        }
    }

    return (
        <SafeAreaView className="flex-1 items-center justify-center">
            <Text>Profile</Text>
            <TouchableOpacity onPress={handleSignOut}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}