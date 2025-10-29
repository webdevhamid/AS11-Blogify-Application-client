import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const SocialShare = ({ shareURL }) => {
  return (
    <div className="flex-row flex p-3 gap-1 justify-center items-center">
      <FacebookShareButton url={shareURL}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={shareURL}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <RedditShareButton url={shareURL}>
        <RedditIcon size={32} round />
      </RedditShareButton>
      <WhatsappShareButton url={shareURL}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <TelegramShareButton url={shareURL}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <LinkedinShareButton url={shareURL}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <EmailShareButton url={shareURL}>
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  );
};

export default SocialShare;
