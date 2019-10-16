import { shallowMount } from "@vue/test-utils";
import ArticleCard from "../../src/components/ArticleCard.vue";

function getArticleCard() {
  const article = {
    title: "Title",
    description: "Description",
    createdAt: "2019-10-16T04:29:52.236Z",
    slug: "xyz-abc",
    author: {
      username: "username",
      image: ""
    }
  };

  const articleCard = shallowMount(ArticleCard, {
    propsData: {
      article
    }
  });
  return articleCard;
}

describe("Article Card.vue", () => {
  it("renders props object when passed", () => {
    const articleCard = getArticleCard();
    expect(articleCard.contains(".article-preview")).toBe(true);
  });
  it("should contain article date", () => {
    const articleCard = getArticleCard();
    expect(articleCard.find(".date").is("span")).toBe(true);
    expect(articleCard.find(".date").text()).toBe("10/16/2019 9:59:52 AM");
  });
  it("should contain article title", () => {
    const articleCard = getArticleCard();
    expect(articleCard.find("h3").is("h3")).toBe(true);
    expect(articleCard.find("h3").text()).toBe("Title");
  });
  it("should contain article description", () => {
    const articleCard = getArticleCard();
    expect(articleCard.find("p").is("p")).toBe(true);
    expect(articleCard.find("p").text()).toBe("Description");
  });
});
