$(document).ready(function(){

	$(".quiz_question").addClass("unanswered");

	var ans = [ - 1,  - 1,  - 1,  - 1,  - 1,  - 1,  - 1];

  	$(".quiz_container .quiz_question ol li").click(function(){

  	if( $(this).parents(".quiz_question").hasClass("answered") ) {
		$(this).parent().children(".selected").removeClass("selected");
		$(this).parents(".quiz_question").addClass("unanswered");
    	$(this).parents(".quiz_question").removeClass("answered");
  	}
	else {
		$(this).addClass("selected");
		$(this).parents(".quiz_question").removeClass("unanswered");
    	$(this).parents(".quiz_question").addClass("answered");
    	ans[$(this).parents(".quiz_question").index()] = $(this).index();
	}


	if($(".quiz_question").length == $(".selected").length) {
  		var t = [0, 0, 0, 0, 0]
  		for(var i = 1; i < 7; i++)
  		{
  			t[ans[i]]++;
  		}
  		
  		var max =  1;
  		var maxval =  - 1;
  		for(var i = 0; i < 5; i++)
  		{
  			if(t[i] > maxval)
  			{
  				max = i;
  				maxval = t[i];
  			}
  		}

  		var resultsHTML;

  		if(max == 0)
  			resultsHTML="<b>Biomedical Library:</b> This place makes Fisher Fine Arts seem straight up social. Only come here if it&#39s time to buckle down. You&#39ve been procrastinating and need some forced motivation (and silence). <br> Location: 36th and Hamilton Walk <br> Hours: Sunday 10 a.m. - midnight, Monday - Thursday 8 a.m. - midnight, Friday 8 a.m - 10 p.m., Saturday 10 a.m. - 6 p.m.";
  		else if(max == 1)
  			resultsHTML="<b>Education Commons:</b> This magical land of bean bag chairs, royal blue couches and spotless group study rooms may be full of athletes, and on the totally wrong side of campus, but there&#39s no other place that makes a full day of studying pleasant. Pro - tip: grab a smoothie or a wrap from Brysi downstairs before settling in.<br>Location: Franklin Field (33rd between Spruce and Walnut)<br>Hours: Sunday 10 a.m. - 11 p.m., Monday - Thursday 9 a.m. - 11 p.m., Friday - Saturday 9 a.m. - 6 p.m.";
  		else if(max == 2)
  			resultsHTML="<b>Inn at Penn:</b> Alright, Princess, we get it. You want the finer things in life, but you kind of have some work to do too. Snag a couch amongst visiting parents and Wharton alums and make yourself at home by the crackling fire. If you stay too late, just ask for a room!<br>Location: 37th and Walnut<br>Hours:  24/7";
  		else if(max == 3)
  			resultsHTML="<b>Highrises:</b> For studying with a view, go straight to the Rooftop Lounges. If you&#39re scared of heights, each floor has its own study lounge too. Don&#39t forget cash because the caf&eacute;s downstairs don&#39t accept bursar.<br>Location: 39th and Locust<br>Hours: 24/7, requires sign in after 2 a.m.";
  		else if(max == 4)
  			resultsHTML="<b>Joe&#39s Cafe:</b> This is a social spot, but a great place to settle for casual work, group brainstorming, or long readings—with coffee, pastries and free soup samples at your disposal.<br>Location: Steinberg Hall - Dietrich Hall, 37th and Spruce<br>Hours: Monday - Thursday 8 a.m. - 5 p.m., Friday 8:30 a.m. - 2 p.m.";

  		$("#quiz_results").html(resultsHTML);
	}
  	else
  		$("#quiz_results").html("");

	if($("#quiz_results").hasClass("huntsman")) {
  		$("#quiz_results").removeClass("huntsman");
		$("#quiz_results").html("");
		$("#q2").css("display", "inline");
  		$("#q3").css("display", "inline");
  		$("#q4").css("display", "inline");
  		$("#q5").css("display", "inline");
  		$("#q6").css("display", "inline");
  		$("#q7").css("display", "inline");
  	}

  	if($(this).closest("#q1").length && $(this).hasClass("selected") && $(this).index() == 1) {
  		$("#quiz_results").addClass("huntsman");
  		$("#quiz_results").html("<b>A GSR in Huntsman</b> <br>Dear Whartonites, Don&#39t take our study spots, and we won&#39t take yours. Love, The rest of us.<br>Location: Huntsman<br>Hours: 24/7");
  		$("#q2").css("display", "none");
  		$("#q3").css("display", "none");
  		$("#q4").css("display", "none");
  		$("#q5").css("display", "none");
  		$("#q6").css("display", "none");
  		$("#q7").css("display", "none");
  	}

  });
});