import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const properties = [
  { id: "1", title: "Modern Villa", city: "Los Angeles", price: "$1,200,000" },
  { id: "2", title: "Cozy Apartment", city: "New York", price: "$850,000" },
  { id: "3", title: "Beach House", city: "Miami", price: "$2,500,000" },
  { id: "4", title: "Luxury Condo", city: "Chicago", price: "$1,100,000" },
  { id: "5", title: "Rustic Cabin", city: "Denver", price: "$600,000" },
];

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 16 }}>
        <Text>Hello world</Text>

        <TextInput
          placeholder="Search city..."
          placeholderTextColor="#999"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 8,
            padding: 10,
            marginTop: 12,
          }}
        />

        <TouchableOpacity
          onPress={() => alert("Search button pressed")}
          style={{
            backgroundColor: "#000",
            padding: 12,
            marginTop: 10,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={{ backgroundColor:"#f9f9f9", padding: 12, borderRadius:8, marginBottom: 5}} >
            <Text style={{ fontWeight: "bold"}}>{item.title}</Text>
            <Text style={{color: "#666"}} >{item.city}</Text>
            <Text style={{color:"blue", fontWeight: "medium"}} >{item.price}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
