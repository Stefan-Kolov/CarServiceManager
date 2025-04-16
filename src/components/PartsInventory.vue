<template>
  <div>
    <h2>Auto Parts Inventory</h2>

    <form @submit.prevent="addPart" class="car-form">
      <input v-model="newPart.name" type="text" placeholder="Part Name" required />
      <input v-model.number="newPart.quantity" type="number" placeholder="Quantity" required min="1" />
      <input v-model.number="newPart.price" type="number" placeholder="Price" required step="0.01" />
      <button type="submit">Add Part</button>
    </form>

    <div class="table-wrapper">
      <table>
        <thead>
        <tr>
          <th>Part Name</th>
          <th>Quantity</th>
          <th>Price (€)</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(part, index) in parts" :key="index">
          <td>{{ part.name }}</td>
          <td :style="{ color: part.quantity === 0 ? 'red' : 'inherit' }">{{ part.quantity }}</td>
          <td>{{ part.price.toFixed(2) }}</td>
          <td>
            <button @click="takePart(index)">Take One</button>
            <button @click="editPart(index)">Edit</button>
            <button @click="deletePart(index)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "PartsInventory",
  data() {
    return {
      newPart: {
        name: '',
        quantity: 0,
        price: 0
      },
      parts: [
        { name: "Brake Pad", quantity: 50, price: 30 },
        { name: "Oil Filter", quantity: 100, price: 10 },
        { name: "Air Filter", quantity: 75, price: 15 },
      ]
    };
  },
  methods: {
    addPart() {
      if (!this.newPart.name || this.newPart.quantity < 1 || this.newPart.price <= 0) return;
      this.parts.push({ ...this.newPart });
      this.newPart = { name: '', quantity: 0, price: 0 };
    },
    deletePart(index) {
      this.parts.splice(index, 1);
    },
    editPart(index) {
      const updated = prompt("Enter new quantity:", this.parts[index].quantity);
      if (updated !== null && !isNaN(updated)) {
        this.parts[index].quantity = parseInt(updated);
      }
    },
    takePart(index) {
      const part = this.parts[index];
      if (part.quantity > 0) {
        part.quantity--;
      } else {
        alert(`No more ${part.name} in stock!`);
      }
    }
  }
};
</script>
