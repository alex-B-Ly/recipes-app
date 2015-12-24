$(document).ready(function() {
	
	// CATEGORIES DISPLAY
	function categoriesSlide(){
		if(window.innerWidth < 768){
			$('.categories').slideToggle(300);
		}else{
			return;
		}
	}

	// POPULATE RECIPE ITEMS
	function recipeItems(){
		var type = $(this).attr('data-food-type');

		$('.main-area').empty();

		if(window.innerWidth < 768){
			$('.categories').fadeOut(100);
		}

		$.ajax({
				url: 'js/'+type+'.json',
				type: 'GET',
				success: function(recipe){
					for(var i=0; i<recipe.length; i++){
						var recipePanel = recipeItemsCreate(recipe[i]);
						$('.main-area').append(recipePanel);
					}
				},
				error: function(){
					$('.main-area').append('Nothing to be found.')
				}
		});

		function recipeItemsCreate(newRecipe){
			var recipeItem = $('<div>'),
			recipeImg = $('<img>'),
			recipeName = $('<p>');

			recipeItem.addClass('col-xs-8 col-xs-offset-2').addClass('col-sm-6 col-sm-offset-0').addClass('col-md-4').addClass('col-lg-3').addClass('text-center').addClass('recipe-item');
			recipeItem.attr('data-recipe', newRecipe.name).attr('data-food-type', type);

			recipeImg.attr('src', newRecipe.imgPath+'1.jpg').addClass('img-responsive').addClass('recipe-item-image');
			recipeName.html(newRecipe.name).addClass('recipe-item-title');

			recipeItem.append(recipeImg);
			recipeItem.append(recipeName);

			return recipeItem;
		}
	}

	// TODO INDIVIDUAL RECIPE INFO DISPLAY
	function recipeInfo(){
		var recipeName = $(this).attr('data-recipe'),
		type = $(this).attr('data-food-type');
	}

	// FUNCTIONS BOUND
	$('.category-select').on('click', recipeItems);
	$('.categories-title').on('click', categoriesSlide);
	$(document).on('click', '.recipe-item' ,recipeInfo);

});