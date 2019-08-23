import DefaultIcon from 'images/default_subreddit_icon.png';

export default function setSubredditImage(iconImage) {
    return iconImage ? iconImage : DefaultIcon;
}
