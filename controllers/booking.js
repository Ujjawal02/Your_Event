const Event = require("../models/event.js");
const Booking = require("../models/booking.js");

module.exports.createBooking = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    req.flash("error", "Event not found!");
    return res.redirect("/events");
  }

  const { fullName, email, mobile, ticketType, quantity } = req.body.booking;
  const totalAmount = quantity * event.price;
  const booking = new Booking({
    // ...req.body.booking,.
    event: event._id,
    user: req.user._id,
    fullName: fullName,
    email: email,
    mobile: mobile,
    ticketType: ticketType,
    quantity: Number(quantity),
    totalAmount: totalAmount,
  });

  const currBooking = await booking.save();
  req.flash("success", "Booking created successfully!");
  console.log(currBooking);
  res.redirect(`/bookings/${booking._id}/payment`);
};

module.exports.renderBookingPage = async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId)
    .populate("event")
    .populate("user");

  res.render("bookings/payment.ejs", { booking });
};


module.exports.processPayment = async (req, res, next) =>{
  const {bookingId} = req.params;
  const booking = await Booking.findById(bookingId);

  if(!booking){
    req.flash("error", "Booking not found!");
    return res.redirect("/events");
  }

  booking.bookingStatus = "Confirmed";
  await booking.save();
  req.flash("success", "Payment successful!");
  res.redirect(`/bookings/${booking._id}`);
}

module.exports.showBooking = async(req, res, next) =>{
  const booking = await Booking.findById(req.params.bookingId).populate('event').populate('user');
  res.render('bookings/showBooking.ejs', {booking});
}