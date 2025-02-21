//
import { useAuthStore } from "../../store/AuthContext.js";
import { useOrderStore } from "../../store/orderStore.js";
import { useEffect } from "react";

const OrdersPage = () => {
  const { currentUser } = useAuthStore();
  const { getOrdersByEmail, ordersByEmail, loading, error } = useOrderStore();

  useEffect(() => {
    if (currentUser && currentUser.email) {
      getOrdersByEmail(currentUser.email);
    }
  }, [currentUser, getOrdersByEmail]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Couldn't load orders</div>;
  }

  return (
    <div className="ml-10 border-b-2 border-gray-500 w-1/2">
      <h2 className="text-3xl text-pink font-bold mt-10">Your Orders</h2>
      {ordersByEmail.length === 0 ? (
        <div>No Orders Here!</div>
      ) : (
        <div>
          {ordersByEmail.map((order, index) => (
            <div key={index}>
              {/* box */}
              <div className="flex justify-between  w-32 items-center bg-gray-800 p-2 rounded-md mt-10 mb-4">
                <span className="text-xs font-bold text-gray-400">
                  Order #{index + 1} - {order.productIds.length} Items
                </span>
              </div>
              {/* box */}
              <h3>Order Id: {order._id}</h3>
              <p>
                <strong>Name:</strong> {order.name}
              </p>
              <p>
                <strong>Email:</strong> {order.email}
              </p>
              <p>
                <strong>Phone:</strong> {order.phone}
              </p>

              <h4>Address:</h4>
              <div>
                <p>
                  <strong>City:</strong> {order.address.city}
                </p>
                <p>
                  <strong>State:</strong> {order.address.state}
                </p>
                <p>
                  <strong>Country:</strong> {order.address.country}
                </p>
                <p>
                  <strong>Zip Code:</strong> {order.address.zipcode}
                </p>
              </div>

              <h4>Product(s):</h4>
              <ul>
                {order.productIds.map((id, i) => (
                  <li key={i}>Product ID: {id}</li>
                ))}
              </ul>

              <p>
                <strong>Total Price:</strong> ${order.totalPrice}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
