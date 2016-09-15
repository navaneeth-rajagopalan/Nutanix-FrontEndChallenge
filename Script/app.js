$(document).ready(function(){
	$.ajax("https://nutanix.0x10.info/api/deals?type=json&query=list_deals",{
		success:function(response){
			var winWidth = $(window).width(),
			docWidth = $(document).width(),
			deals = response.deals;
			
			//console.log(deals.length);			
			for(var index=0, noOfDeals = deals.length; index<noOfDeals; index++)
			{	
				//console.log(index);
				var deal = deals[index],
				rating = deals[index]["rating"],
				//console.log(deal);
				finalPrice = parseInt(deal["actual_price"]) - (parseInt(deal["actual_price"]) * parseFloat(deal["discount"]) / 100.0),
				//console.log(finalPrice.toFixed(2));
				htmlTemplate = $('<section class="deals" data-prod-likes="0">' +
					'<div><h1 class="productHeading">'+ deal["name"] + '</h1></div>' +
				'<h3 class="provider">'+ deal["provider"] +'</h3>' +
				'<div class="prodDetails">' + 
				'<img class="prodImg" src="'+ deal["image"] +'">' + 
				'<div class="prodDesc">' + 
				'<span class="ratingImg" data-rating="'+ rating +'"></span>' + 
				'<span class="ratingTxt">'+ deal["rating"] +'</span>' + 
				'<span class="link">Link: <a href="'+ deal["link"] +'">'+ deal["link"] +'</a></span>' + 
				'<span class="actualPrice">Actual Price:<span class="stikeoutPrice"> &#8377 '+ deal["actual_price"] +'</span></span>' + 
				'<span class="finalPrice">Final Price:<span class="highlightPrice"> &#8377 '+ finalPrice.toFixed(2) +'</span></span>' + 
				'<span class="offer">'+ deal["discount"] + ' off' +'</span><span class="likes">0</span>' + 
				'</div></div></section>'); 
				$("main").append(htmlTemplate);				
			}
			//console.log(winWidth+"\t"+docWidth);
				$("main").find(".deals").each(function(){
				
				var ratingImg = $(this).find(".ratingImg"),
				rating = parseFloat(ratingImg.data("rating"));
				//console.log("rating: "+rating);
				//console.log("int rating:" + parseInt(rating));
				if(parseFloat(rating) % 1 >= 0.5)
				{
					//console.log("greater than 0.5");
					//console.log("moving by " + (parseInt(rating) + 1 )*10 +"px");
					ratingImg.css("backgroundPosition","0 -"+ (parseInt(rating) * 2 + 1 )*20 + "px");
				}
				else
				{
					//console.log("lesser than 0.5");
					//console.log("moving by " + (parseInt(rating))*10 +"px");
					ratingImg.css("backgroundPosition","0 -"+ (parseInt(rating) * 2)*20 + "px");	
				}
				//console.log("image pos: -"+rating * 10 + "px");
				//ratingImg.css("backgroundPosition","0 -"+ rating*10 + "px");
			});
		},
		dataType:"json",
		error: function(request,errorType,errorMessage){
			console.log("ERROR: " + errorType + " with message " + errorMessage);
		},
		beforeSend:function(){
			$("body").addClass("loading");
		},
		complete:function(){
			$("body").removeClass("loading");
		} 	
	});
	$.ajax("https://nutanix.0x10.info/api/deals?type=json&query=api_hits", {
		success: function(response){
			//console.log(response.api_hits);
			$("#hits").html("| API Hits: "+ response.api_hits);
		},
		dataType:"json",
		error: function(request,errorType,errorMessage){
			console.log("ERROR: " + errorType + " with message " + errorMessage);
		}
	});
	
	$("main").on("click",".likes", function(){
		//console.log("Clicked");
		var deal = $(this).closest(".deals"),
		pageData = $(this).closest("main").prev().find(".page-data"),
		likeCount = parseInt(deal.data("prod-likes")),
		totalLikes = pageData.data("total-likes");
		//console.log(likeCount);
		likeCount++;
		deal.data("prod-likes", likeCount);
		deal.find(".likes").html(likeCount);		
		//console.log(likeCount);
		totalLikes++;
		pageData.data("total-likes", totalLikes);
		pageData.find("#likes").html("Total likes: " + totalLikes);
	});
});