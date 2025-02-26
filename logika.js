let skillBlocks = {
        "Menelstwo + Łowiectwo": ["Kowalstwo","Alchemictwo", "Stolarstwo", "Krawiectwo", "Karczmarstwo", "Strzelectwo", "Złodziejstwo"],
        "Menelstwo + Alchemictwo": ["Łowiectwo", "Kowalstwo","Stolarstwo", "Krawiectwo", "Karczmarstwo", "Strzelectwo", "Złodziejstwo"],
        "Menelstwo + Stolarstwo": ["Łowiectwo", "Alchemictwo", "Kowalstwo", "Krawiectwo", "Karczmarstwo", "Strzelectwo", "Złodziejstwo"],
        "Menelstwo + Krawiectwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Kowalstwo", "Karczmarstwo", "Strzelectwo", "Złodziejstwo"],
        "Menelstwo + Karczmarstwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Krawiectwo", "Kowalstwo", "Strzelectwo", "Złodziejstwo"],
        "Menelstwo + Strzelectwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Krawiectwo", "Karczmarstwo", "Kowalstwo", "Złodziejstwo"],
        "Menelstwo + Złodziejstwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Krawiectwo", "Karczmarstwo", "Strzelectwo", "Kowalstwo"],
        "Menelstwo + Kowalstwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Krawiectwo", "Karczmarstwo", "Strzelectwo", "Złodziejstwo"],
        "Stolarstwo + Łowiectwo": ["Alchemictwo", "Kowalstwo", "Krawiectwo", "Karczmarstwo", "Strzelectwo", "Złodziejstwo"],
        "Stolarstwo + Alchemictwo": ["Łowiectwo", "Kowalstwo", "Krawiectwo", "Karczmarstwo", "Strzelectwo", "Złodziejstwo"],
        "Stolarstwo + Kowalstwo": ["Łowiectwo", "Alchemictwo", "Krawiectwo", "Karczmarstwo", "Strzelectwo", "Złodziejstwo"],
        "Stolarstwo + Krawiectwo": ["Łowiectwo", "Alchemictwo", "Kowalstwo", "Karczmarstwo", "Strzelectwo", "Złodziejstwo"],
        "Stolarstwo + Karczmarstwo": ["Łowiectwo", "Alchemictwo", "Kowalstwo", "Krawiectwo", "Strzelectwo", "Złodziejstwo"],
        "Stolarstwo + Strzelectwo": ["Łowiectwo", "Alchemictwo", "Kowalstwo", "Krawiectwo", "Karczmarstwo", "Złodziejstwo"],
        "Stolarstwo + Złodziejstwo": ["Łowiectwo", "Alchemictwo", "Kowalstwo", "Krawiectwo", "Karczmarstwo", "Strzelectwo"],
        "Kowalstwo + Łowiectwo": ["Alchemictwo", "Stolarstwo", "Krawiectwo", "Karczmarstwo", "Strzelectwo", "Złodziejstwo"],
        "Kowalstwo + Alchemictwo": ["Łowiectwo", "Stolarstwo", "Krawiectwo", "Karczmarstwo", "Strzelectwo", "Złodziejstwo"],
        "Kowalstwo + Stolarstwo": ["Łowiectwo", "Alchemictwo", "Krawiectwo", "Karczmarstwo", "Strzelectwo", "Złodziejstwo"],
        "Kowalstwo + Krawiectwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Karczmarstwo", "Strzelectwo", "Złodziejstwo"],
        "Kowalstwo + Karczmarstwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Krawiectwo", "Strzelectwo", "Złodziejstwo"],
        "Kowalstwo + Strzelectwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Krawiectwo", "Karczmarstwo", "Złodziejstwo"],
        "Kowalstwo + Złodziejstwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Krawiectwo", "Karczmarstwo", "Strzelectwo"],
        "Krawiectwo + Łowiectwo": ["Alchemictwo", "Stolarstwo", "Kowalstwo", "Karczmarstwo", "Strzelectwo", "Złodziejstwo"],
        "Krawiectwo + Alchemictwo": ["Łowiectwo", "Stolarstwo", "Kowalstwo", "Karczmarstwo", "Strzelectwo", "Złodziejstwo"],
        "Krawiectwo + Stolarstwo": ["Łowiectwo", "Alchemictwo", "Kowalstwo", "Karczmarstwo", "Strzelectwo", "Złodziejstwo"],
        "Krawiectwo + Kowalstwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Karczmarstwo", "Strzelectwo", "Złodziejstwo"],
        "Krawiectwo + Karczmarstwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Kowalstwo", "Strzelectwo", "Złodziejstwo"],
        "Krawiectwo + Strzelectwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Kowalstwo", "Karczmarstwo", "Złodziejstwo"],
        "Krawiectwo + Złodziejstwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Kowalstwo", "Karczmarstwo", "Strzelectwo"],
        "Karczmarstwo + Łowiectwo": ["Alchemictwo", "Stolarstwo", "Kowalstwo", "Krawiectwo", "Strzelectwo", "Złodziejstwo"],
        "Karczmarstwo + Alchemictwo": ["Łowiectwo", "Stolarstwo", "Kowalstwo", "Krawiectwo", "Strzelectwo", "Złodziejstwo"],
        "Karczmarstwo + Stolarstwo": ["Łowiectwo", "Alchemictwo", "Kowalstwo", "Krawiectwo", "Strzelectwo", "Złodziejstwo"],
        "Karczmarstwo + Kowalstwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Krawiectwo", "Strzelectwo", "Złodziejstwo"],
        "Karczmarstwo + Krawiectwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Kowalstwo", "Strzelectwo", "Złodziejstwo"],
        "Karczmarstwo + Strzelectwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Kowalstwo", "Krawiectwo", "Złodziejstwo"],
        "Karczmarstwo + Złodziejstwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Kowalstwo", "Krawiectwo", "Strzelectwo"],
        "Strzelectwo + Łowiectwo": ["Alchemictwo", "Stolarstwo", "Kowalstwo", "Krawiectwo", "Karczmarstwo", "Złodziejstwo"],
        "Strzelectwo + Alchemictwo": ["Łowiectwo", "Stolarstwo", "Kowalstwo", "Krawiectwo", "Karczmarstwo", "Złodziejstwo"],
        "Strzelectwo + Stolarstwo": ["Łowiectwo", "Alchemictwo", "Kowalstwo", "Krawiectwo", "Karczmarstwo", "Złodziejstwo"],
        "Strzelectwo + Kowalstwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Krawiectwo", "Karczmarstwo", "Złodziejstwo"],
        "Strzelectwo + Krawiectwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Kowalstwo", "Karczmarstwo", "Złodziejstwo"],
        "Strzelectwo + Karczmarstwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Kowalstwo", "Krawiectwo", "Złodziejstwo"],
        "Strzelectwo + Złodziejstwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Kowalstwo", "Krawiectwo", "Karczmarstwo"],
        "Złodziejstwo + Łowiectwo": ["Alchemictwo", "Stolarstwo", "Kowalstwo", "Krawiectwo", "Karczmarstwo", "Strzelectwo"],
        "Złodziejstwo + Alchemictwo": ["Łowiectwo", "Stolarstwo", "Kowalstwo", "Krawiectwo", "Karczmarstwo", "Strzelectwo"],
        "Złodziejstwo + Stolarstwo": ["Łowiectwo", "Alchemictwo", "Kowalstwo", "Krawiectwo", "Karczmarstwo", "Strzelectwo"],
        "Złodziejstwo + Kowalstwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Krawiectwo", "Karczmarstwo", "Strzelectwo"],
        "Złodziejstwo + Krawiectwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Kowalstwo", "Karczmarstwo", "Strzelectwo"],
        "Złodziejstwo + Karczmarstwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Kowalstwo", "Krawiectwo", "Strzelectwo"],
        "Złodziejstwo + Strzelectwo": ["Łowiectwo", "Alchemictwo", "Stolarstwo", "Kowalstwo", "Krawiectwo", "Karczmarstwo"]
    }
    
