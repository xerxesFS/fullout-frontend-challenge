$(document).ready(function () {
  $("#submit").click(function () {
    const day = $("#day").val();
    const month = $("#month").val();
    const year = $("#year").val();

    const dayIsBlank = day.trim() === "";
    const monthIsBlank = month.trim() === "";
    const yearIsBlank = year.trim() === "";

    dayIsBlank ? dayErrorOn("This field is required") : dayErrorOff();
    monthIsBlank ? monthErrorOn("This field is required") : monthErrorOff();
    yearIsBlank ? yearErrorOn("This field is required") : yearErrorOff();

    if (!dayIsBlank && !monthIsBlank && !yearIsBlank) {
      const dayNotNum = isNaN(day);
      const monthNotNum = isNaN(month);
      const yearNotNum = isNaN(year);

      const dayOutOfRange = parseInt(day) < 1 || parseInt(day) > 31;
      const monthOutOfRange = parseInt(month) < 1 || parseInt(month) > 12;
      const yearOutOfRange = parseInt(year) > moment().year();

      dayNotNum || dayOutOfRange ? dayErrorOn("Day is invalid") : dayErrorOff();
      monthNotNum || monthOutOfRange
        ? monthErrorOn("Month is invalid")
        : monthErrorOff();
      yearNotNum || yearOutOfRange
        ? yearErrorOn("Year is invalid")
        : yearErrorOff();

      if (
        !dayNotNum &&
        !monthNotNum &&
        !yearNotNum &&
        !dayOutOfRange &&
        !monthOutOfRange &&
        !yearOutOfRange
      ) {
        let a = moment(new Date(), "YYYY/MM/DD");

        let b = moment(
          [parseTwoDigitYear(year), parseInt(month), parseInt(day)],
          "YYYY/MM/DD"
        );

        let years = a.diff(b, "year");
        b.add(years, "years");

        let months = a.diff(b, "months");
        b.add(months, "months");

        let days = a.diff(b, "days");

        $("#yearCalc").html(years);
        $("#monthCalc").html(months);
        $("#dayCalc").html(days);
      }
    }
  });

  //UI changes
  const dayErrorOn = (error) => {
    $("#dayLabel").removeClass("text-gray-500");
    $("#dayLabel").addClass("text-red-500");
    $("#day").removeClass("focus:border-[#923dff]");
    $("#day").addClass("ring-1 ring-red-500");
    $("#dayError").html(error);
  };

  const dayErrorOff = () => {
    $("#dayLabel").removeClass("text-red-500");
    $("#dayLabel").addClass("text-gray-500");
    $("#day").removeClass("ring-1 ring-red-500");
    $("#day").addClass("focus:border-[#923dff]");
    $("#dayError").html("");
  };

  const monthErrorOn = (error) => {
    $("#monthLabel").removeClass("text-gray-500");
    $("#monthLabel").addClass("text-red-500");
    $("#month").removeClass("focus:border-[#923dff]");
    $("#month").addClass("ring-1 ring-red-500");
    $("#monthError").html(error);
  };

  const monthErrorOff = () => {
    $("#monthLabel").removeClass("text-red-500");
    $("#monthLabel").addClass("text-gray-500");
    $("#month").removeClass("ring-1 ring-red-500");
    $("#month").addClass("focus:border-[#923dff]");
    $("#monthError").html("");
  };

  const yearErrorOn = (error) => {
    $("#yearLabel").removeClass("text-gray-500");
    $("#yearLabel").addClass("text-red-500");
    $("#year").removeClass("focus:border-[#923dff]");
    $("#year").addClass("ring-1 ring-red-500");
    $("#yearError").html(error);
  };

  const yearErrorOff = () => {
    $("#yearLabel").removeClass("text-red-500");
    $("#yearLabel").addClass("text-gray-500");
    $("#year").removeClass("ring-1 ring-red-500");
    $("#year").addClass("focus:border-[#923dff]");
    $("#yearError").html("");
  };

  const parseTwoDigitYear = (str) => {
    return parseInt(str) < 100 ? `00${str}` : str;
  };
});
