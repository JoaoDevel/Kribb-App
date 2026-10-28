import { formatPrice } from "@/lib/utils";
import { Property } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function FeaturedCard({ property }: { property: Property }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="w-72 mr-3 rounded-xl overflow-hidden"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        opacity: property.is_sold ? 0.5 : 1,
      }}
      onPress={() => router.push(`/(root)/property/${property.id}`)}
    >
      {/* Image */}
      <Image
        source={{ uri: property.images[0] }}
        className="w-full h-44"
        resizeMode="cover"
      />

      <View className="absolute top-3 left-3 bg-white/90 rounded-full px-3 py-1">
        <Text className="text-xs text-blue-500 capitalize font-semibold">
          {property.type}
        </Text>
      </View>

      {/* Sold Badge */}
      {property.is_sold && (
        <View className="absolute top-3 right-3 bg-red-500 px-3 py-1 rounded-full">
          <Text className="text-xs text-white font-semibold capitalize">
            Sold
          </Text>
        </View>
      )}

      <View className="p-4">
        <Text
          className="text-base font-bold text-gray-800 mb-1"
          numberOfLines={1}
        >
          {property.title}
        </Text>

        <View className="flex-row items-center gap-1 mb-3">
          <Ionicons name="location-outline" size={13} color={"#6B7280"} />
          <Text className="text-xs text-gray-500 capitalize" numberOfLines={1}>
            {property.address}, {property.city}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-base font-bold">
            {formatPrice(property.price)}
          </Text>

          {/* Bedrooms    */}
          <View className="flex-row items-center gap-1">
            <Ionicons name="bed-outline" size={13} color={"#6B7280"} />
            <Text>{property.bedrooms}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
