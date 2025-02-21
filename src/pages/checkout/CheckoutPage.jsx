//
import { NavLink } from "react-router-dom";
import useCartStore from "../../store/cartStore.js";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuthStore } from "../../store/AuthContext.js";
import { useOrderStore } from "../../store/orderStore.js";
import { useNavigate } from "react-router-dom";
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";

const CheckoutPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [phone, setPhone] = useState("");

  //   import cart items
  const { cartItems, clearCart } = useCartStore();
  // get post order to add an order to mongoDB and use it in submit function with await
  const { postOrder } = useOrderStore();
  // redirect user after placing an order
  const navigate = useNavigate();

  //   handle cart totals with this function
  const cartTotals = cartItems
    .reduce((accumulator, item) => accumulator + item.newPrice, 0)
    .toFixed(2);
  //   temporary solution.
  // TODO: get current user from auth(complete)
  // const currentUser = false;
  // now we will import the really currentUser from zustand
  const { currentUser } = useAuthStore();

  // imported from react form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  //   const onSubmit = (data) => console.log(data);
  // we will change this and make it store the data fields in an object:
  const onSubmit = async (data) => {
    console.log(data);
    const newOrder = {
      name: data.name,
      email: currentUser ? currentUser.email : null,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,
      productIds: cartItems.map((item) => (item ? item._id : null)),
      totalPrice: cartTotals,
    };
    // console.log(newOrder);
    // we have a backend so we can make an order now
    try {
      const result = await postOrder(newOrder);
      if (result.success) {
        alert(result.message);
        clearCart();
        navigate("/orders");
      }
    } catch (error) {
      console.log("Error in placing and order", error);
      alert("Failed to place an order");
    }
  };

  return (
    <>
      <div>
        {/* wrapper */}
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <div>
                <h2 className="font-semibold text-xl text-gray-600 mb-2">
                  Checkout
                </h2>
                <p className="text-gray-500 mb-2">
                  Total Price: ${cartTotals ? cartTotals : 0}
                </p>
                <p className="text-gray-500 mb-6">
                  Items: {cartItems.length > 0 ? cartItems.length : 0}
                </p>
              </div>

              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
                >
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Personal Details</p>
                    <p>Please fill out all of the fields:</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlFor="full_name">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          {...register("name", {
                            required: "Name is required",
                          })}
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label html="email">Email Address</label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          {...register("email")}
                          disabled
                          value={currentUser?.email || ""}
                          placeholder="email@domain.com"
                        />
                      </div>

                      <label html="phone">Phone Number</label>
                      <PhoneInput
                        defaultCountry="pk"
                        value={phone}
                        onChange={(phone) => {
                          setPhone(phone);
                          setValue("phone", phone);
                        }}
                        style={{ maxWidth: "16rem" }}
                        className="md:col-span-5"
                      />

                      <div className="md:col-span-3">
                        <label htmlFor="address">Address / Street</label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          {...register("address")}
                          placeholder=""
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          {...register("city")}
                          placeholder=""
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="country">Country / region</label>
                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            name="country"
                            id="country"
                            placeholder="Country"
                            className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                            {...register("country")}
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="state">State / province</label>
                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            name="state"
                            id="state"
                            placeholder="State"
                            className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                            {...register("state")}
                          />
                        </div>
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="zipcode">Zipcode</label>
                        <input
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          {...register("zipcode")}
                          placeholder=""
                        />
                      </div>
                      {/* terms and conditions */}
                      <div className="md:col-span-5 mt-3">
                        <div className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="billing_same"
                            id="billing_same"
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                            className="form-checkbox"
                          />
                          <label htmlFor="billing_same" className="ml-2 ">
                            I agree to the{" "}
                            <NavLink className="underline underline-offset-2 text-blue-600">
                              Terms & Conditions
                            </NavLink>{" "}
                            and{" "}
                            <NavLink className="underline underline-offset-2 text-blue-600">
                              Shopping Policy
                            </NavLink>
                            .
                          </label>
                        </div>
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button
                            disabled={!isChecked}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Place an Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* wrapper */}
      </div>
    </>
  );
};
export default CheckoutPage;
