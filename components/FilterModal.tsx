import { PropertyType, useFilterStore } from "@/store/filterStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const TYPES: { label: string; value: PropertyType }[] = [
  { label: "All", value: null },
  { label: "Apartment", value: "apartament" },
  { label: "House", value: "house" },
  { label: "Villa", value: "villa" },
  { label: "Studio", value: "studio" },
];

const BEDS = [
  { label: "Any", value: null },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4+", value: 4 },
];

const PRICE_PRESETS = [
  { label: "Under $5M", min: null, max: 5000000 },
  { label: "$5M – $10M", min: 5000000, max: 10000000 },
  { label: "$10M – $20M", min: 10000000, max: 20000000 },
  { label: "Above $20M", min: 20000000, max: null },
];

const chip = (active: boolean) =>
  `px-4 py-2 rounded-full border ${active ? "bg-blue-600 border-blue-600" : "bg-white border-gray-200"}`;

const chiptText = (active: boolean) =>
  `text-sm font-semibold ${active ? "text-white" : "text-gray-600"}`;

export default function FilterModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const {
    search,
    bedrooms,
    maxPrice,
    minPrice,
    type,
    setBedrooms,
    setMaxPrice,
    setMinPrice,
    setSearch,
    setType,
    resetFilters,
  } = useFilterStore();

  const [localMin, setLocalMin] = useState(minPrice ? String(minPrice) : "");
  const [localMax, setLocalMax] = useState(maxPrice ? String(maxPrice) : "");

  const activeCount = [type, bedrooms, minPrice, maxPrice].filter(
    (v) => v !== null,
  ).length;

  const handleApply = () => {
    setMinPrice(localMin ? Number(localMin) : null);
    setMaxPrice(localMax ? Number(localMax) : null);
    onClose();
  };

  const handleReset = () => {
    setLocalMin("");
    setLocalMax("");
    resetFilters();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-gray-50">
        <View className="flex-row items-center justify-between px-5 pt-6 pb-4 bg-white border-b border-gray-100">
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={22} color="#374151" />
          </TouchableOpacity>

          <Text className="text-lg font-bold text-gray-900 ">Filters</Text>

          <TouchableOpacity onPress={handleReset}>
            <Text className="text-blue-600 font-semibold text-sm">Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Property Type */}
          <Text className="text-base font-bold text-gray-800 mb-3">
            Property Type
          </Text>

          <View className="flex-row flex-wrap gap-2 mb-6">
            {TYPES.map((item) => (
              <TouchableOpacity
                key={String(item.value)}
                onPress={() => setType(item.value)}
                className={chip(type === item.value)}
              >
                <Text className={chiptText(type === item.value)}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bedrooms */}
          <Text className="text-base font-bold text-gray-800 mb-3">
            Bedrooms
          </Text>

          <View className="flex-row flex-wrap gap-2 mb-6">
            {BEDS.map((item) => (
              <TouchableOpacity
                key={String(item.value)}
                onPress={() => setBedrooms(item.value)}
                className={chip(bedrooms === item.value)}
              >
                <Text className={chiptText(bedrooms === item.value)}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-base font-bold text-gray-800 mb-3">
            Price Ranger
          </Text>

          <View className="flex-row gap-2">
            {[
              {
                label: "Min Price",
                value: localMin,
                onChange: setLocalMin,
                placeholder: "0",
              },
              {
                label: "Max Price",
                value: localMax,
                onChange: setLocalMax,
                placeholder: "Any",
              },
            ].map(({ label, value, onChange, placeholder }) => (
              <View key={label} className="flex-1">
                <Text className="text-xs text-gray-500 font-medium mb-1.5">
                  {label}
                </Text>
                <View className="flex-row items-center bg-white rounded-2xl px-3  border border-gray-200">
                  <Text className="text-gray-500 mr-1 text-sm">$</Text>
                  <TextInput
                    className="flex-1 py-3 text-gray-800"
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              </View>
            ))}
          </View>

          <View className="flex-row flex-wrap gap-2 mb-6">
            {/* {BEDS.map((item) => (
              <TouchableOpacity
                key={String(item.value)}
                onPress={() => setBedrooms(item.value)}
                className={chip(bedrooms === item.value)}
              >
                <Text className={chiptText(bedrooms === item.value)}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))} */}
          </View>
        </ScrollView>
        <View className="px-5 pb-8 pt-4 bg-white border-t border-gray-100">
          <TouchableOpacity
            onPress={handleApply}
            className="bg-blue-600 rounded-2xl py-4 items-center"
          >
            <Text className="text-white font-bold text-base">
              Apply Filters {activeCount > 0 ? `(${activeCount})` : ""}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
