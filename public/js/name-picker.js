import names from './names.js';

const $listOfSelectableNames = $('#listOfNamesToSelect');
const $namesSpinner = $('#listOfNames');
const $spinButton = $('#spinButton');

function AnimateList($listToAnimate, AnimationRamp, AnimationThreshold, onCompletionEvent) {
  $listToAnimate.css({
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
    height: '2em'
  });
  let $allListItems = $('li', $listToAnimate);
  $allListItems.css({
    display: 'block',
    position: 'absolute',
    top: '-200px'
  });

  $allListItems = $allListItems.filter((index, element) => !$(element)
    .hasClass('exclude'));

  let animationDuration = 20;
  const animationRamp = AnimationRamp || 10;
  const animationThreshold = AnimationThreshold || 150;
  let currentItem = 1;
  const selectedListItem = Math.floor(Math.random() * $allListItems.length) + 1;
  var animateItems = function () {
    $allListItems.filter(`:nth-child(${currentItem})`)
      .animate({
        top: '0'
      },
      {
        duration: animationDuration,
        complete() {
          currentItem++;
          if (currentItem > $allListItems.length) {
            currentItem = 1;
          }
          if (animationDuration > animationThreshold && currentItem == selectedListItem) {
            if (onCompletionEvent != undefined) {
              onCompletionEvent();
            }
          } else {
            animationDuration += animationRamp;
            animateItems();
          }
        }
      });

    const itemToMoveOffScreen = currentItem > 1 ? currentItem - 1 : $allListItems.length;
    $allListItems.filter(`:nth-child(${itemToMoveOffScreen})`)
      .animate({
        top: '500px'
      },
      {
        duration: animationDuration,
        complete() {
          $(this)
            .css({ top: '-500px' });
        }
      });
  };

  animateItems();
}

function populateListOfNames() {
  names.forEach(name => $namesSpinner.append(`<li>${name}</li>`));
  // getDayAndFilterAdjectives($listOfAdjectives, $adjectiveSpinner);
  // animateAdjectives = new AnimateList(wordListName, $adjectiveSpinner, 5, 70, translateAndDescribeWord);
}

function spin() {
  AnimateList($namesSpinner);
}

populateListOfNames();
$namesSpinner.hide();
$spinButton.click(spin);

function postUpdateToTeamMember(name, selected) {
  $.ajax('/', {
    contents: {
      name,
      selected
    }
  });
}

$('input[type=checkbox]', $listOfSelectableNames).click(function() {
  postUpdateToTeamMember($(this).val(), this.checked);
});
